from flask import Flask, render_template, redirect, flash, session, request, jsonify
from model import db, User, Ride, Request, TravelList, connect_to_db
import crud
from twilio.rest import Client
from sqlalchemy import func, distinct
from datetime import datetime
import jinja2
import json
import os

app = Flask(__name__)

# A secret key is needed to use Flask sessioning features
#access by source secrets.sh
app.secret_key = os.environ['secret_key']
account_sid = os.environ['account_sid']
auth_token  = os.environ['auth_token']
client = Client(account_sid, auth_token)
twilio_phone_num = os.environ['twilio_phone_num']


# Normally, if you refer to an undefined variable in a Jinja template,
# Jinja silently ignores this. This makes debugging difficult, so we'll
# set an attribute of the Jinja environment that says to make this an
# error.
app.jinja_env.undefined = jinja2.StrictUndefined

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

current_time = datetime.now()


@app.route('/')
def index():
    """Return homepage."""
    print(session)

    return render_template("index.html")

@app.route('/process-login', methods = ["POST"])
def login_user():
    """Allow user to login."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if not user:
        flash('No users exist under this email. Please register.')
    if user:
        if password == user.password:
            session['user_id'] = user.user_id
            flash('Successfully logged in!')
            # print(session)
        else:
            flash('Incorrect password. Please try again.')

    return redirect('/')

@app.route('/process-signup', methods = ["POST"])
def register_user():
    """Allow new users to register."""
    first_name = request.form.get('f_name')
    last_name = request.form.get('l_name')
    email = request.form.get('email')
    phone_num = request.form.get('phone')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    #hash password
    if user is None:
        crud.create_user(first_name = first_name, last_name = last_name, email = email, password = password, phone_num = phone_num)
        flash('You have successfully registered! Log in to continue.')
    else:
        flash('A user with that email has already been registered.')

    return redirect('/')

@app.route('/post')
def post_ride():
    """Return post a ride page."""

    print(session)

    if 'user_id' in session:
        return render_template("post.html")
    else:
        flash("Only registered users can post a ride. Please login.")
        return redirect('/')

@app.route('/post-complete', methods =['POST'])
def post_ride_to_database():
    #if session id expires..->redirect back to homepage and flash session expired, please log in again;.else execute the following

    start_loc = request.form.get('from_input')
    end_loc = request.form.get('to_input')
    date = request.form.get('date') #change to datetime?
    seats = request.form.get('seats')
    price = request.form.get('price')
    comments = request.form.get('comments')

    crud.create_ride(driver_id = session['user_id'], seats = seats, date = date, start_loc = start_loc, end_loc = end_loc, price= price, comments = comments)
    flash('Ride successfully added! ')
    return redirect('/post')

@app.route('/search')
def search_for_ride():
    """Return post a ride page."""

    return render_template("search.html") 

@app.route('/search-results')
def post_search_to_page():

    start_loc = request.args.get('from_input')
    end_loc = request.args.get('to_input')

    matching_rides = crud.get_matching_rides(start_loc = start_loc, end_loc = end_loc)
    print('**************************************************************MATCHING RIDES \n', matching_rides, '\n*********************************** ***************************') 
    
    return render_template('search_results.html', matching_rides = matching_rides)

# @app.route('/search-results')
# def post_search_to_page():

#     # start_loc = request.args.get('from_input')
#     # end_loc = request.args.get('to_input')
#     start_loc = request.args.get('from_input')
#     end_loc = request.args.get('to_input')

#     matching_rides = Ride.query.filter(Ride.start_loc == start_loc, Ride.end_loc == end_loc).all()
#     print(matching_rides)

#     rides_list = []
#     for rides in matching_rides:
#         res_data = rides.serialize()
#         rides_list.append(res_data)
    
#     #return render_template('search_results.html', matching_rides = matching_rides)
#     return jsonify({'res': rides_list})

@app.route('/request-ride.json', methods = ['POST'])
def request_ride():

    ride_id = request.form.get('ride_id')
    rider_msg = request.form.get('rider_msg')

    ride = crud.get_ride_by_id(ride_id)
    driver_id = ride.driver_id
    req = crud.get_request(rider_id = session['user_id'], ride_id = ride_id)

    print('THIS IS THE REQUEST INFORMATION:', req)
    print('THIS IS THE RIDER MESSAGE', rider_msg)
    print('THIS IS THE RIDE ID', ride, 'THIS IS THE DRIVER ID', driver_id)
    if req is None:
        if driver_id != session['user_id']:
            add_req = Request(ride_id = ride_id, rider_id = session['user_id'], status = 'Pending')
            db.session.add(add_req)
            db.session.commit()
            resp = jsonify({'msg': "Ride successfully requested."})
            #print('THIS IS THE DRIVERs FIRST NAME', add_req.ride.user.first_name)
            #print('THIS IS THE RIDERS PHONE NUM', add_req.user.phone_num)
            # send_twilio_message = client.messages.create(
            #     to= add_req.ride.user.phone_num, 
            #     from_= twilio_phone_num , #(rider aka session['user_id']) add_req.user.phone_num
            #     body= rider_msg)
        else:
            resp = jsonify({'msg': "You cannot request your own ride."})
    else:
        resp = jsonify({'msg': "You already requested this ride."})
        print('THIS IS THE DRIVER ID',req.ride.driver_id)

    return resp

@app.route('/profile')
def get_user_profile():
    """Return profile page."""
    if 'user_id' in session:
        #user = User.query.options(db.joinedload('ride')).filter(User.user_id == session['user_id']).one()
        user = crud.get_user_by_id(user_id = session['user_id'])
        # print('LIST OF RIDE REQUESTS', user.request)
        # print('LIST WHERE USER DRIVES', user.ride)   
        destinations = 0 
        people_met = 0
        dollars_earned = 0  
        for ride in user.ride: #for rides where the user drives
            destinations += db.session.query(db.func.count(distinct(ride.end_loc))).count()
            #print(destinations)
            # print('REQUESTS FOR RIDE #', ride.ride_id, ride.request)
            # print('RIDE PRICE', ride.price)
            for req in ride.request: #find all the requests for that ride 
                if req.status == 'Approved': #if the status is approved,
                    people_met +=1 #add one to number of people met
                    dollars_earned += req.ride.price #add the ride price (for each approved passenger, add the ride price)
        for req in user.request: #for the rides that I am a passenger
            if req.status == 'Approved':
                destinations += 1
            print('REQUEST INFO***REQUEST INFO***REQUEST INFO***', req)
            print('RIDE INFO***RIDE INFO***RIDE INFO***', req.ride)
            for req in req.ride.request: #go to the request -> get the req.status = approved
                print('ALL THE REQUESTS FOR THAT RIDE I AM A PASSENGER OF', req)
                if req.status == 'Approved':
                    people_met +=1 #(-1 for me as the passenger but +1 for the driver balances to 0)

        travel_list = crud.get_user_travel_list(user_id = session['user_id'])

    return render_template("profile.html", user = user, destinations = destinations, dollars_earned = dollars_earned, people_met = people_met, travel_list = travel_list) 

@app.route('/travel-list', methods=['POST'])
def add_location_to_travel_list():

    list_item = request.form.get('list_item')

    crud.create_new_travel_list_item(user_id = session['user_id'], list_item = list_item)
    travel_list = crud.get_user_travel_list(user_id = session['user_id'])

    travel_list_result = []
    for item in travel_list:
        serialize_item = item.serialize()
        travel_list_result.append(serialize_item)
    print(travel_list_result)

    return jsonify({'list': travel_list_result})

@app.route('/current-rides')
def get_user_current_rides():
    """Return current trips page."""
    current_user_drives = crud.get_current_user_drives(driver_id = session['user_id'])
    current_ride_requests = crud.get_current_user_requests(rider_id = session['user_id'])

    return render_template("current_trips.html", current_user_drives = current_user_drives, current_ride_requests = current_ride_requests) 

@app.route('/past-rides')
def get_user_past_rides():

    past_user_drives = crud.get_past_user_drives(driver_id = session['user_id'])
    past_ride_requests = crud.get_past_user_requests(rider_id = session['user_id'])

    return render_template("past_trips.html", past_user_drives = past_user_drives, past_ride_requests = past_ride_requests) 

@app.route('/confirm-rides.json', methods=['POST'])
def confirm_rides():

    rider_id = request.form.get("rider_id")
    status = request.form.get("status")
    request_id = request.form.get("request_id")
    ride_id = request.form.get("ride_id")

    print('******************************\n''request_id =', request_id, 'rider_id=', rider_id, 'ride_id =', ride_id, 'status=', status)

    get_request_to_update = crud.get_request_by_request_id(request_id = request_id)

    if status == 'Approved':
        if get_request_to_update.ride.seats > 0:
            get_request_to_update.ride.seats -= 1
            get_request_to_update.status = 'Approved'
            db.session.commit()
            resp = jsonify({'msg': 'Ride successfully approved.', 'seats': get_request_to_update.ride.seats, 'first_name': get_request_to_update.user.first_name, 'last_name': get_request_to_update.user.first_name})
        else:
            resp = jsonify({'msg': 'Seat capacity has been reached for this ride.', 'seats': get_request_to_update.ride.seats})
            get_request_to_update.status = 'Denied'
            db.session.commit()
    else:
        get_request_to_update.status = 'Denied'
        db.session.commit()
        resp = jsonify({'msg': 'Ride removed.', 'seats': get_request_to_update.ride.seats})
    
    return resp

@app.route('/logout')
def logout_user():
    """Logout user."""

    if 'user_id' in session:
        #del session['user_id']
        session.pop('user_id', None)
    
    print(session)

    return redirect('/')

if __name__ == "__main__":
    connect_to_db(app, echo= False)

    
    app.run(debug=True, host="0.0.0.0", port=5000)

    #RESEARCH @login_required

