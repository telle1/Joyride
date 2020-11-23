from flask import Flask, render_template, redirect, flash, session, request, jsonify, url_for
from functools import wraps #for log-inrequired
from model import db, User, Ride, Request, Feedback, connect_to_db
from werkzeug.utils import secure_filename #to upload files securely
import crud
from twilio.rest import Client
from sqlalchemy import func, distinct
from datetime import datetime
# import jinja2
import json
import os

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

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
# app.jinja_env.undefined = jinja2.StrictUndefined

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)

current_time = datetime.now()
#for some reason, using this variable to update timestamp in my databse does not work;
#instead, i just have to call datetime.now() directly

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' in session:
            return f(*args, **kwargs)
        else:
            flash("You must be logged in first.")
            return redirect('/')
    return decorated_function

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def check_image(image):
    if image.filename == '':
        print('No filename')
        return 'Invalid'
    else:
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'Valid'

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

    user = crud.get_user_by_email(data['email'])
    #hash password
    if user is None:
        crud.create_user(first_name = data['firstName'], last_name = data['lastName'], 
            email = data['email'], password = data['password'], phone_num = data['phoneNumber'])
        resp = jsonify({'msg': 'You have successfully registered! Log in to continue.', 'color': 'success'})
    else:
        resp = jsonify({'msg': 'A user with that email has already been registered.', 'color': 'danger'})

    return resp

@app.route('/post-complete', methods =['POST'])
@login_required
def post_ride_to_database():

    data = request.json
    
    crud.create_ride(driver_id = session['user_id'], seats = data['seats'], 
        date = data['date'], start_loc = data['from'], end_loc = data['to'], 
        price= data['price'], comments = data['comments'])
    
    return jsonify({'msg': 'Ride successfully added.'})

@app.route('/search-results', methods=['POST'])
def post_search_to_page():

    data = request.json

    matching_rides = crud.get_matching_rides(start_loc = data['startInput'], end_loc = data['endInput'],
        sort = data['sort'])
    print(matching_rides)
    
    return jsonify({'res': matching_rides})

@app.route('/request-ride', methods = ['POST'])
@login_required #returns undefined, but does not redirect
def request_ride():

    data = request.json
    ride_id = data['ride_id']
    rider_msg = data['rider_msg']
    seats_str = data['seats']
    seats = int(seats_str)
    ride = crud.get_ride_by_id(ride_id)
    driver_id = ride.driver_id

    req = crud.get_request(rider_id = session['user_id'], ride_id = ride_id)

    if req is None:
        if driver_id != session['user_id'] and 1 <= seats <= ride.seats:
            add_req = Request(ride_id = ride_id, rider_id = session['user_id'], 
                seats_requested= seats, status = 'Pending', date= datetime.now())
            db.session.add(add_req)
            db.session.commit()
            resp = jsonify({'msg': "Ride successfully requested.", 'alert': 'success'})
            #print('THIS IS THE DRIVERs FIRST NAME', add_req.ride.user.first_name)
            #print('THIS IS THE RIDERS PHONE NUM', add_req.user.phone_num)
            # send_twilio_message = client.messages.create(
            #     to= add_req.ride.user.phone_num, 
            #     from_= twilio_phone_num , #(rider aka session['user_id']) add_req.user.phone_num
            #     body= rider_msg)
        elif seats > ride.seats or seats <= 0:
            resp = jsonify({'msg': "You cannot request that number of seats.", 'alert': 'danger'})
        else:
            resp = jsonify({'msg': "You cannot request your own ride.", 'alert': 'danger'})
    else:
        resp = jsonify({'msg': "You already requested this ride.", 'alert': 'warning'})

    return resp

@app.route('/current-drives')
@login_required
def get_user_current_drives():
    """Return current trips page."""
    current_user_drives = crud.get_current_user_drives(driver_id = session['user_id'])

    current_drives_list = []
    for drive in current_user_drives:
        serialize_drive = drive.serialize()
        for req in drive.request:
            req_serialized = req.serialize_passenger_info()
            if req.status == 'Approved':         
                serialize_drive['passengers'].append(req_serialized)
            elif req.status == 'Pending':
                serialize_drive['requests'].append(req_serialized)
            else:
                print('Request denied')

        current_drives_list.append(serialize_drive)

    print('****CURRENT DRIVES LIST', current_drives_list)
    return jsonify({'drives': current_drives_list})

@app.route('/current-rides')
def get_current_rides():

    current_ride_requests = crud.get_current_user_requests(rider_id = session['user_id'])
    current_rides_list = []
    for req in current_ride_requests:
        if req.status != 'Cancelled By Passenger':
            req_serialized = req.serialize_ride_info()
            current_rides_list.append(req_serialized)

    return jsonify({'rides': current_rides_list})

@app.route('/notifications')
def get_notifications():

    current_ride_requests = crud.get_current_user_requests_by_date(rider_id = session['user_id'])
    current_ride_requests.reverse()

    notifications_list = []
    for req in current_ride_requests:
        if req.status != 'Cancelled By Passenger' and req.status != 'Pending':
            req_serialized = req.serialize_ride_info()
            notifications_list.append(req_serialized)
    
    return jsonify({'notifications': notifications_list})

@app.route('/past-rides')
@login_required
def get_user_past_rides():

    past_user_drives = crud.get_past_user_drives(driver_id = session['user_id'])
    past_ride_requests = crud.get_past_user_requests(rider_id = session['user_id'])

    past_drives_ser = []
    for drive in past_user_drives:
        drive_ser = drive.serialize()
        drive_ser['feedback_count'] = 0
        for req in drive.request:
            if req.status == 'Approved':
                drive_ser['passengers'].append({'id': req.user.user_id, 
                    'first_name': req.user.first_name, 'last_name': req.user.last_name})
            feedback_count = crud.check_if_driver_gave_feedback(ride_id = req.ride_id, passenger = req.user.user_id)
            if feedback_count:
                drive_ser['feedback_count'] += 1
        past_drives_ser.append(drive_ser)


    past_rides_ser = []
    for req in past_ride_requests:
        if req.status == 'Approved':
            req_serialized = req.serialize_ride_info()
            did_passenger_give_feedback= crud.check_if_passenger_gave_feedback(ride_id = req.ride.ride_id, passenger = req.user.user_id)
            if did_passenger_give_feedback:
                req_serialized['feedback'] = 'Done'

            past_rides_ser.append(req_serialized)

    print('PAST DRIVES.........', past_drives_ser)
    print('PAST REQUESTSPAST REQUESTSPAST REQUESTS', past_rides_ser)

    return jsonify({'drives': past_drives_ser, 'rides': past_rides_ser})

@app.route('/confirm-rides', methods=['POST'])
def confirm_rides():

    data = request.json
    status = data['status']
    request_id = data['request_id']
    seats_requested = data['seats']
    print('******************************STATUS /SEATS/ AND REQUEST_ID LINE330', status, request_id, seats_requested)

    get_request_to_update = crud.get_request_by_request_id(request_id = request_id)

    if status == 'Approved':
        if get_request_to_update.ride.seats - seats_requested >= 0:
            get_request_to_update.ride.seats -= seats_requested
            get_request_to_update.status = 'Approved'
            get_request_to_update.date = datetime.now()
            db.session.commit()
            resp = jsonify({'msg': 'Ride successfully approved.', 'alert_color': "success"})
        else:
            resp = jsonify({'msg': 'Seat capacity will be over the limit.', 'alert_color': "warning"})
            # get_request_to_update.status = 'Denied' #maybe don't deny it, driver can remove rides to add this one instead or choose to delete it themselves
            db.session.commit()
    else:
        get_request_to_update.status = 'Denied'
        get_request_to_update.date = datetime.now()
        db.session.commit()
        resp = jsonify({'msg': 'Ride removed.', 'alert_color': "success"})
    
    return resp

@app.route('/edit-ride', methods=['POST'])
def edit_ride():

    data = request.json

    crud.edit_driver_ride(ride_id = data['ride_id'], seats = data['seats'], 
        price = data['price'], comments = data['comments'], date = data['date'], 
        start_loc = data['from'], end_loc = data['to'])

    return jsonify({'msg': 'Ride successfully edited.', 'color': 'success'})

@app.route('/remove-passenger', methods=['POST'])
def remove_passenger():

    data = request.json
    request_id = data['request_id']
    seats_to_add = data['seatsToAdd']

    req_to_update = crud.get_request_by_request_id(request_id)
    print(req_to_update)
    print('SEATS', req_to_update.ride.seats)

    req_to_update.status = 'Removed'
    req_to_update.date = datetime.now()

    ride_of_req = req_to_update.ride
    ride_of_req.seats += seats_to_add
    db.session.commit()
    print('INCREMENTED SEATS', ride_of_req.seats)

    return jsonify({'msg': 'Successfully removed passenger.', 'color': 'success'})
    
@app.route('/delete-ride', methods=['POST'])
def delete_ride():
    data = request.json
    ride_id = data['ride_id']
    print('RIDE ID', ride_id)
    crud.delete_user_ride(ride_id = ride_id)

    return jsonify({'msg': 'Ride successfully cancelled.', 'color': 'success'})

@app.route('/delete-request', methods=['POST'])
def delete_request():

    data = request.json

    crud.delete_user_request(request_id = data['request_id'], seats_to_add = data['seats'])

    return jsonify({'msg': 'Deleted ride.'})

@app.route('/edit-seats-request', methods=['POST'])
def edit_seats_request():
    data = request.json
    request_id = data['request_id']
    seats_str= data['seats']
    seats_request = int(seats_str)
    print(type(seats_request))
    ride_req = crud.get_request_by_request_id(request_id)

    if 0 < seats_request <= ride_req.ride.seats:
        ride_req.seats_requested = seats_request
        db.session.commit()
        resp = jsonify({'msg': 'Seats request pending approval.', 'alert': 'success'})
    else:
        resp = jsonify({'msg': 'You cannot request that number of seats.', 'alert': 'danger'})

    print(ride_req)
    print(ride_req.ride)

    return resp

@app.route('/give-driver-feedback', methods=['POST'])
def give_driver_feedback():
    data = request.json

    crud.create_new_feedback(feedback = data['feedback'], rating= data['rating'], ride_id = data['ride_id'], 
    feedback_receiver = data['receiver'], feedback_giver = data['giver'])

    return jsonify({'msg': 'Added feedback'})

@app.route('/give-passenger-feedback', methods=['POST'])
def give_passenger_feedback():
    data = request.json
    print(data)
    feedback = data['feedback']
    rating = data['rating']
    feedback_giver = data['giver']
    receiver = data['receiver']
    ride_id = data['ride_id']

    feedback_duplicate = crud.check_if_driver_gave_feedback(ride_id = ride_id, passenger= receiver)
    if feedback_duplicate:
        resp = jsonify({'msg': 'You already gave feedback for this passenger.', 'color': 'danger'})
    else:
        crud.create_new_feedback(feedback = feedback, rating= rating, ride_id = ride_id, 
        feedback_receiver = receiver, feedback_giver = feedback_giver)
        resp = jsonify({'msg': 'Thank you for the feedback.', 'color': 'success'})

    return resp

@app.route('/dashboard/<user_id>')
@login_required
def get_user_dashboard(user_id):
    """Return dashboard page."""
    user_info = crud.get_dashboard_info(user_id = user_id)

    return jsonify({'destinations': user_info['destinations'], 
        'people_met': user_info['people_met'], 
        'dollars_earned': user_info['dollars_earned']})

@app.route('/get-user-profile-info/<user_id>')
def get_user_info(user_id):
    #Feedback and rating info
    feedback_info = crud.get_user_feedback(user_id = user_id)
    print('tHIS IS THE FEEDBACK INFO', feedback_info)
    feedback_list = feedback_info['feedback']

    if feedback_info['average_rating'] != 'N/A':
        average_rating = "{:.1f}".format(feedback_info['average_rating']) #round the number to one decimal
    else:
        average_rating = 'N/A'
    #Profile picture, location, and title info
    profile = crud.get_user_profile(profile_id = user_id)
    if profile:
        profile_ser = {'image': profile.image, 'location': profile.location, 'title': profile.title}
    else: #instead of none, pass in empty strings to make it easier on the front end and the edit modal
        profile_ser = {'image': "user.jpg", 'location': "", 'title': ""}
    print('SERIALIZED', profile_ser)
    #Email and phone number info
    user = crud.get_user_by_id(user_id = user_id)
    user_info = user.serialize()
    #Stats: total drives and rides count
    user_stats = crud.get_dashboard_info(user_id = user_id)
    user_drives_count = user_stats['drives']
    user_rides_count = user_stats['rides']

    return jsonify({'feedback': feedback_list, 'profile_info': profile_ser, 
                    'user_info': user_info, 'average_rating': average_rating, 
                    'drives_count': user_drives_count, 'rides_count': user_rides_count,})

@app.route('/edit-profile', methods=['POST'])
def edit_user_profile():
    
    data = request.form.to_dict()
    title = data['title']
    location = data['location']
    profile_id = data['profile_id']

    profile = crud.get_user_profile(profile_id = profile_id)
    if profile:
        profile.title = title
        profile.location = location
        if 'image' in request.files:
            image = request.files['image']
            image_status = check_image(request.files['image'])
            if image_status == 'Valid':
                profile.image = image.filename
            else:
                resp = {'msg': 'There was something wrong with your image.'}
        db.session.commit()
        resp = {'msg': 'Successfully uploaded profile.'}
    else:
        if 'image' in request.files:  
            image = request.files['image']
            image_status = check_image(request.files['image'])  
            if image_status == 'Valid':
                filename = image.filename
            else: 
                resp = {'msg': 'There was something wrong with your image.'}
        else:
            filename = "user.jpg"

        crud.create_user_profile(profile_id = profile_id, image = filename, title = title, location = location)
        resp = {'msg': 'Successfully uploaded profile.'}
    return resp

@app.route('/logout', methods=['POST'])
def logout_user():
    """Logout user."""

    if 'user_id' in session:
        session.pop('user_id', None)
    print(session)
    return jsonify({'msg': 'Logged out'})

if __name__ == "__main__":
    connect_to_db(app, echo= False)
    
    app.run(debug=True, host="0.0.0.0", port=5000)

    
