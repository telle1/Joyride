from flask import Flask, render_template, redirect, flash, session, request, jsonify, url_for
from functools import wraps #for log-inrequired
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

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' in session:
            return f(*args, **kwargs)
        else:
            flash("You must be logged in first.")
            return redirect('/')
    return decorated_function

@app.route('/')
def index():
    """Return homepage."""
    print(session)
    return render_template('react.html')

@app.route('/process-login', methods = ["POST"])
def login_user():
    """Allow user to login."""

    data = request.json
    email = data['email']
    password = data['password']

    user = crud.get_user_by_email(email)
    if not user:
        resp = jsonify({'msg': 'No users exist under this email. Please register.'})
    if user:
        if password == user.password:
            session['user_id'] = user.user_id
            resp = jsonify({'msg': 'Successfully logged in!', 'user_id': user.user_id})
        else:
            resp = jsonify({'msg': 'Incorrect password. Please try again.'})

    return resp

@app.route('/process-signup', methods = ["POST"])
def register_user():
    """Allow new users to register."""
    data = request.json

    print(data)

    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    phone_num = data['phoneNumber']
    password = data['password']

    user = crud.get_user_by_email(email)
    #hash password
    if user is None:
        crud.create_user(first_name = first_name, last_name = last_name, email = email, password = password, phone_num = phone_num)
        resp = jsonify({'msg': 'You have successfully registered! Log in to continue.', 'success': 'success'})
    else:
        resp = jsonify({'msg': 'A user with that email has already been registered.'})

    return resp

@app.route('/post-complete', methods =['POST'])
@login_required
def post_ride_to_database():

    data = request.json
    start_loc = data['from']
    end_loc = data['to']
    date = data['date']
    seats = data['seats']
    price = data['price']
    comments = data['comments']

    ride = crud.create_ride(driver_id = session['user_id'], seats = seats, date = date, start_loc = start_loc, end_loc = end_loc, price= price, comments = comments)
    return jsonify({'msg': 'Ride successfully added.'})

@app.route('/search-results', methods=['POST'])
def post_search_to_page():

    data = request.json
    start_loc = data['startInput']
    end_loc = data['endInput']
    matching_rides = crud.get_matching_rides(start_loc = start_loc, end_loc = end_loc)
    print('**************************************************************MATCHING RIDES NON-SERIALIZED \n', matching_rides, '\n*********************************** ***************************') 
    
    rides_list = []
    for rides in matching_rides:
        res_data = rides.serialize()
        rides_list.append(res_data)
    print('*********MATCHING RIDES********', rides_list)
    return jsonify({'res': rides_list})

@app.route('/request-ride', methods = ['POST'])
@login_required #returns undefined, but does not redirect
def request_ride():

    data = request.json
    ride_id = data['ride_id']
    rider_msg = data['rider_msg']

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
        print('THIS IS THE DRIVER ID', req.ride.driver_id)

    return resp

@app.route('/profile')
@login_required
def get_user_profile():
    """Return profile page."""
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
@login_required
def get_user_current_rides():
    """Return current trips page."""
    current_user_drives = crud.get_current_user_drives(driver_id = session['user_id'])
    current_ride_requests = crud.get_current_user_requests(rider_id = session['user_id'])

    current_drives_list = []
    for drive in current_user_drives:
        serialize_drive = drive.serialize()
        
        for req in drive.request:
            if req.status == 'Approved':
                serialize_drive['passengers'] = [req.user.first_name, req.user.last_name]
            if req.status == 'Pending':
                serialize_drive['requests'] = [req.user.first_name, req.user.last_name]
    
        current_drives_list.append(serialize_drive)
    
    current_rides_list = []
    for req in current_ride_requests:
        req_serialized = {
            'date': req.ride.date,
            'start_loc': req.ride.start_loc,
            'end_loc': req.ride.end_loc,
            'driver': [req.ride.user.first_name, req.ride.user.last_name],
            'cost': req.ride.price,
            'status': req.status,
        }
        current_rides_list.append(req_serialized)
    print('tHIS IS THE CURRENT REQUEST LIST', current_rides_list)
    return jsonify({'drives': current_drives_list, 'rides': current_rides_list})

@app.route('/past-rides')
@login_required
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

