from flask import Flask, render_template, redirect, flash, session, request, jsonify
from model import db, User, Ride, Request, Profile, connect_to_db
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

@app.route('/')
def index():
    """Return homepage."""
    print(session)

    current_time = datetime.now()
    print(current_time)

    return render_template("index.html")


@app.route('/process-login', methods = ["POST"])
def login_user():
    """Allow user to login."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter(User.email == email).first()

    if not user:
        flash('No users exist under this email. Please register.')
    if user:
        if password == user.password:
            session['user_id'] = user.user_id
            flash('Successfully logged in!')
            print(session)
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

    print(phone_num)
    user = User.query.filter(User.email == email).first()
    #hash password
    if user is None:
        new_user = User(first_name = first_name, last_name = last_name, email = email, password = password, phone_num = phone_num)
        db.session.add(new_user)
        db.session.commit()
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

    ride = Ride(driver_id = session['user_id'], seats = seats, date = date, start_loc = start_loc, end_loc = end_loc, price= price, comments = comments)
    db.session.add(ride)
    db.session.commit()

    flash('Ride successfully added! ')
    return redirect('/post')

@app.route('/search')
def search_for_ride():
    """Return post a ride page."""

    return render_template("search.html") 

@app.route('/search-results')
def post_search_to_page():

    current_time = datetime.now()
    start_loc = request.args.get('from_input')
    end_loc = request.args.get('to_input')

    matching_rides = Ride.query.filter(Ride.start_loc == start_loc, Ride.end_loc == end_loc, Ride.date > current_time).all()
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

    ride = Ride.query.filter(Ride.ride_id == ride_id).first()
    driver_id = ride.driver_id
    req = Request.query.filter(Request.ride_id == ride_id, Request.rider_id == session['user_id']).first()
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
        user = User.query.options(db.joinedload('ride')).filter(User.user_id == session['user_id']).one()
        # print('LIST OF RIDE REQUESTS', user.request)
        # print('LIST WHERE USER DRIVES', user.ride)   
        destinations = 0 
        people_met = 0
        dollars_earned = 0  
        test = 0
        for ride in user.ride: #for rides where the user drives
            destinations += db.session.query(db.func.count(distinct(ride.end_loc))).count()
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

    return render_template("profile.html", user = user, destinations = destinations, dollars_earned = dollars_earned, people_met = people_met) 

@app.route('/edit-profile', methods = ['POST'])
def update_user_profile():
    """Edit profile page."""

    location = request.form.get("location")
    bio = request.form.get("bio")

    print(location)
    print(bio)
    profile = Profile.query.filter(Profile.user_id == session['user_id']).first()
    if not profile:
        add_profile = Profile(user_id = session['user_id'], location = location, bio= bio)
        db.session.add(add_profile)
        db.session.commit()
    else:         
        profile.location = location
        profile.bio = bio
        db.session.commit()

    return redirect("/profile") 

@app.route('/current-rides')
def get_user_current_rides():
    """Return current trips page."""

    current_time = datetime.now()
    user_drives = Ride.query.filter(Ride.driver_id == session['user_id'], Ride.date > current_time).all()
    all_user_rides = Request.query.filter(Request.rider_id == session['user_id']).all()
    current_user_rides = []
    for req in all_user_rides:
        if req.ride.date > current_time:
            current_user_rides.append(req)

    return render_template("current_trips.html", user_drives = user_drives, current_user_rides = current_user_rides) 

@app.route('/past-rides')
def get_user_past_rides():

    current_time = datetime.now()
    user_drives = Ride.query.filter(Ride.driver_id == session['user_id'], Ride.date < current_time).all()
    all_user_rides = Request.query.filter(Request.rider_id == session['user_id']).all()
    past_user_rides = []
    for req in all_user_rides:
        if req.ride.date < current_time:
            past_user_rides.append(req)

    return render_template("past_trips.html", user_drives = user_drives, past_user_rides = past_user_rides) 

@app.route('/confirm-rides.json', methods=['POST'])
def confirm_rides():

    rider_id = request.form.get("rider_id")
    status = request.form.get("status")
    request_id = request.form.get("request_id")
    ride_id = request.form.get("ride_id")

    print('******************************\n''request_id =', request_id, 'rider_id=', rider_id, 'ride_id =', ride_id, 'status=', status)

    update_request = Request.query.filter(Request.request_id == request_id).first()

    if status == 'Approved':
        if update_request.ride.seats > 0:
            update_request.ride.seats -= 1
            update_request.status = 'Approved'
            db.session.commit()
            resp = jsonify({'msg': 'Ride successfully approved.', 'seats': update_request.ride.seats, 'first_name': update_request.user.first_name, 'last_name': update_request.user.first_name})
        else:
            resp = jsonify({'msg': 'Seat capacity has been reached for this ride.', 'seats': update_request.ride.seats})
            update_request.status = 'Denied'
            db.session.commit()
    else:
        update_request.status = 'Denied'
        db.session.commit()
        resp = jsonify({'msg': 'Ride removed.', 'seats': update_request.ride.seats})
    
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

