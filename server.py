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
            resp = jsonify({'msg': "Ride successfully requested.", 'alert': 'success'})
            #print('THIS IS THE DRIVERs FIRST NAME', add_req.ride.user.first_name)
            #print('THIS IS THE RIDERS PHONE NUM', add_req.user.phone_num)
            # send_twilio_message = client.messages.create(
            #     to= add_req.ride.user.phone_num, 
            #     from_= twilio_phone_num , #(rider aka session['user_id']) add_req.user.phone_num
            #     body= rider_msg)
        else:
            resp = jsonify({'msg': "You cannot request your own ride.", 'alert': 'danger'})
    else:
        resp = jsonify({'msg': "You already requested this ride.", 'alert': 'warning'})
        print('THIS IS THE DRIVER ID', req.ride.driver_id)

    return resp

@app.route('/profile')
@login_required
def get_user_profile():
    """Return profile page."""
    user = crud.get_user_by_id(user_id = session['user_id'])

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
        if req.status == 'Approved': #add one to destination if my req was approved
            destinations += 1
        print('REQUEST INFO***REQUEST INFO***REQUEST INFO***', req)
        print('RIDE INFO***RIDE INFO***RIDE INFO***', req.ride)
        for req in req.ride.request: #get all the requests for each ride I am in
            print('ALL THE REQUESTS FOR THAT RIDE I AM A PASSENGER OF', req)
            if req.status == 'Approved':
                people_met +=1 #(-1 for me as the passenger but +1 for the driver balances to 0)

    #travel_list = crud.get_user_travel_list(user_id = session['user_id'])

    return jsonify({'first_name': user.first_name, 'last_name': user.last_name, 
                  'destinations': destinations, 'people_met': people_met, 'dollars_earned': dollars_earned})

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
                if 'passengers' in serialize_drive:
                    serialize_drive['passengers'].append([req.user.first_name, req.user.last_name])
                else:
                    serialize_drive['passengers'] = [[req.user.first_name, req.user.last_name]]
            if req.status == 'Pending':
                if 'requests' in serialize_drive:
                    serialize_drive['requests'].append({'id': req.request_id, 
                                                       'name': [req.user.first_name, req.user.last_name]})
                else:
                    serialize_drive['requests'] = [{'id': req.request_id, 'name': [req.user.first_name, req.user.last_name]}]
        
        current_drives_list.append(serialize_drive)

    print('****CURRENT DRIVES LIST', current_drives_list)

    
    current_rides_list = []
    for req in current_ride_requests:
        req_serialized = {
            'date': req.ride.date,
            'start_loc': req.ride.start_loc,
            'end_loc': req.ride.end_loc,
            'driver': [req.ride.user.first_name, req.ride.user.last_name],
            'cost': req.ride.price,
            'status': req.status,
            'request_id': req.request_id
        }
        current_rides_list.append(req_serialized)

    return jsonify({'drives': current_drives_list, 'rides': current_rides_list})

@app.route('/past-rides')
@login_required
def get_user_past_rides():

    past_user_drives = crud.get_past_user_drives(driver_id = session['user_id'])
    past_ride_requests = crud.get_past_user_requests(rider_id = session['user_id'])

   # print('PAST USER DRIVES', past_user_drives)
    past_drives_ser = []
    for drive in past_user_drives:
        drive_ser = drive.serialize()
        for req in drive.request:
            if req.status == 'Approved':
                drive_ser['passengers'] = [req.user.first_name, req.user.last_name]
        past_drives_ser.append(drive_ser)
    
    past_rides_ser = []
    for req in past_ride_requests:
        req_serialized = {
            'date': req.ride.date,
            'start_loc': req.ride.start_loc,
            'end_loc': req.ride.end_loc,
            'driver': [req.ride.user.first_name, req.ride.user.last_name],
            'cost': req.ride.price,
        }
        past_rides_ser.append(req_serialized)

    return jsonify({'drives': past_drives_ser, 'rides': past_rides_ser})

@app.route('/confirm-rides', methods=['POST'])
def confirm_rides():

    data = request.json
    status = data['status']
    request_id = data['request_id']
    print('******************************STATUS AND REQUEST_ID LINE330', status, request_id)

    get_request_to_update = crud.get_request_by_request_id(request_id = request_id)

    if status == 'Approved':
        if get_request_to_update.ride.seats > 0:
            get_request_to_update.ride.seats -= 1
            get_request_to_update.status = 'Approved'
            db.session.commit()
            resp = jsonify({'msg': 'Ride successfully approved.', 'alert_color': "success"})
        else:
            resp = jsonify({'msg': 'Seat capacity has been reached for this ride.', 'alert_color': "warning"})
            get_request_to_update.status = 'Denied'
            db.session.commit()
    else:
        get_request_to_update.status = 'Denied'
        db.session.commit()
        resp = jsonify({'msg': 'Ride removed.', 'alert_color': "success"})
    
    return resp

@app.route('/edit-ride', methods=['POST'])
def edit_ride():

    data = request.json
    ride_id = data['ride_id']
    seats = data['seats']
    price = data['price']
    comments = data['comments']
    date = data['date']
    start_loc = data['from']
    end_loc = data['to']

    ride = crud.get_ride_by_id(ride_id)
    print('BEFORE RIDE INFO', ride)

    ride.seats = seats
    ride.price = price
    ride.comments = comments
    ride.date = date
    ride.start_loc = start_loc
    ride.end_loc = end_loc

    db.session.commit()
    print('UPDATED RIDE INFO', ride)

    return jsonify({'msg': 'Ride successfully edited.'})
    

@app.route('/delete-request', methods=['POST'])
def delete_request():

    data = request.json
    request_id = data['request_id']
    print('THIS IS THE REQUEST ID LINE 277', request_id)
    req_to_delete = crud.get_request_by_request_id(request_id)
    print(req_to_delete)
    print('SEATS', req_to_delete.ride.seats)

    if req_to_delete.status == 'Approved':
        ride_of_req = req_to_delete.ride
        ride_of_req.seats +=1
        db.session.add(ride_of_req)
        db.session.commit()
        print('INCREMENTED SEATS', ride_of_req.seats)

    db.session.delete(req_to_delete)
    db.session.commit()
    #notify driver?

    return jsonify({'msg': 'Deleted ride.'})

@app.route('/delete-ride', methods=['POST'])
def delete_ride():
    data = request.json
    ride_id = data['ride_id']

    ride = crud.get_ride_by_id(ride_id)
    print('THIS IS THE RIDE DELETED LINE339', ride)

    reqs_for_ride = ride.request
    print('REQUESTS FOR RIDE TO DELETE', reqs_for_ride)
    for req in reqs_for_ride:
        req.status = 'Cancelled'
        db.session.commit() #do not add since we are updating the ride

    db.session.delete(ride)
    db.session.commit()

    return jsonify({'msg': 'Ride successfully cancelled.'})


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

