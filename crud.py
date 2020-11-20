from model import db, User, Ride, Request, Feedback, UserProfile, connect_to_db
from datetime import datetime

current_time = datetime.now()

def create_user(first_name, last_name, email, phone_num, password):
    """Create new user."""
    new_user = User(first_name = first_name, last_name = last_name, email = email, password = password, phone_num = phone_num)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_user_by_email(email):
    """Return a user by email."""
    return User.query.filter(User.email == email).first()

def get_user_by_id(user_id):
    """Return a user by user_id."""
    return User.query.filter(User.user_id == user_id).first()

def create_ride(driver_id, seats, date, start_loc, end_loc, price, comments):
    """Add a ride to the database."""
    new_ride = Ride(driver_id = driver_id, seats = seats, date = date, start_loc = start_loc, end_loc = end_loc, price= price, comments = comments)
    db.session.add(new_ride)
    db.session.commit()
    return new_ride

def get_ride_by_id(ride_id):
    """Return a ride by ride_id."""
    return Ride.query.filter(Ride.ride_id == ride_id).first()

def get_matching_rides(start_loc, end_loc):
    """Return matching rides via start and end loc."""
    matching_rides = Ride.query.filter(Ride.start_loc == start_loc, Ride.end_loc == end_loc, Ride.date > current_time).all()
    rides_list = []
    for ride in matching_rides:
        ride_serialized = ride.serialize()
        driver_feedback = get_user_feedback(ride.user.user_id)
        if driver_feedback['average_rating'] == 'N/A':
            ride_serialized['average_rating'] = 'N/A'
        else:
            ride_serialized['average_rating'] = "{:.1f}".format(float(driver_feedback['average_rating']))
        if ride.user.profile:
            ride_serialized['driver_picture'] = ride.user.profile.image
        rides_list.append(ride_serialized)

    return rides_list


def get_request(ride_id, rider_id):
    """Return requests for a certain ride made by a certain user."""
    return Request.query.filter(Request.ride_id == ride_id, Request.rider_id == rider_id).first()

def get_request_by_request_id(request_id):
    """Return requests by request_id"""
    return Request.query.filter(Request.request_id == request_id).first()

def get_current_user_drives(driver_id):
    """Return current rides where the user drives."""
    drives = Ride.query.filter(Ride.driver_id == driver_id, Ride.date > current_time, Ride.deleted_at == None)
    return drives.order_by('date').all()

def get_past_user_drives(driver_id):
    """Return past rides where the user drives."""
    return Ride.query.filter(Ride.driver_id == driver_id, Ride.date < current_time).all()

def get_current_user_requests(rider_id):
    """Return current rides where the user rides"""
    all_user_requests = Request.query.filter(Request.rider_id == rider_id)
    sorted_requests = all_user_requests.order_by('request_id').all()

    current_user_requests = []
    for req in sorted_requests:
        if req.ride.date > current_time:
            current_user_requests.append(req)

    return current_user_requests

def get_past_user_requests(rider_id):
    """Return past rides where the user rides"""
    all_user_requests = Request.query.filter(Request.rider_id == rider_id).all()
    past_user_requests = []
    for req in all_user_requests:
        if req.ride.date < current_time:
            past_user_requests.append(req)
    return past_user_requests

def delete_user_ride(ride_id):

    ride = get_ride_by_id(ride_id)
    ride.deleted_at = datetime.now()

    reqs_for_ride = ride.request
    for req in reqs_for_ride:
        req.status = 'Cancelled'
        req.date = datetime.now()
        db.session.commit() 
    db.session.commit()

def delete_user_request(request_id, seats_to_add):

    print('THIS IS THE REQUEST ID LINE 277', request_id)
    req_to_delete = get_request_by_request_id(request_id)
    print(req_to_delete)
    print('SEATS ORIGINALLY', req_to_delete.ride.seats)

    if req_to_delete.status == 'Approved':
        ride_of_req = req_to_delete.ride
        ride_of_req.seats += seats_to_add
        # db.session.add(ride_of_req)
        db.session.commit()
        print('INCREMENTED SEATS', ride_of_req.seats)

    db.session.delete(req_to_delete)
    db.session.commit()
    # notify driver?

def edit_driver_ride(ride_id, seats, price, comments, date, start_loc, end_loc):

    ride = get_ride_by_id(ride_id = ride_id)

    ride.seats = seats
    ride.price = price
    ride.comments = comments
    ride.date = date
    ride.start_loc = start_loc
    ride.end_loc = end_loc

    db.session.commit()


def get_dashboard_info(user_id):

    user = get_user_by_id(user_id = user_id)
    destinations = 0 
    rides = 0
    drives = 0
    people_met = 0
    dollars_earned = 0  

    for ride in user.ride: #for rides where the user drives
        drives += 1
        destinations += 1 #db.session.query(db.func.count(distinct(ride.end_loc))).count()
        for req in ride.request: #find all the requests for that ride 
            if req.status == 'Approved': #if the status is approved,
                people_met += req.seats_requested #add one to number of people met
                dollars_earned += (req.ride.price * req.seats_requested) #add the ride price (for each approved passenger, add the ride price)
    for req in user.request: #for the rides that I am a passenger
        if req.status == 'Approved': #add one to destination if my req was approved
            destinations += 1
            rides += 1
            for req in req.ride.request: #get all the requests for each ride I am in
                if req.status == 'Approved':
                    people_met += req.seats_requested #(-1 for me as the passenger but +1 for the driver balances to 0)
    
    user_info = {'rides': rides, 'drives': drives, 'destinations': destinations, 'people_met': people_met,
                'dollars_earned': dollars_earned}

    return user_info


def create_new_feedback(feedback, rating, feedback_giver, ride_id, feedback_receiver):
    
    new_feedback = Feedback(feedback = feedback, rating = rating, 
    feedback_giver = feedback_giver, feedback_receiver = feedback_receiver, ride_id = ride_id)
    db.session.add(new_feedback)
    db.session.commit()

def get_user_feedback(user_id):

    all_feedback = Feedback.query.filter(Feedback.feedback_receiver == user_id).all()
    feedback_list = []
    rating = 0
    for feedback in all_feedback:
        feedback_ser = {'id': feedback.feedback_id, 'feedback': feedback.feedback, 'rating': feedback.rating}
        feedback_list.append(feedback_ser)
        feedback_list.reverse()
        rating += feedback_ser['rating']
    if len(all_feedback) > 0:
        average_rating = rating/len(all_feedback)
    else:
        average_rating = 'N/A'

    feedback_info = {'feedback': feedback_list, 'average_rating': average_rating}
    
    return feedback_info

def get_user_gives_feedback_count(user_id):

    return Feedback.query.filter(Feedback.feedback_giver == user_id).count()


def check_if_passenger_gave_feedback(ride_id, passenger):

    return Feedback.query.filter(Feedback.ride_id == ride_id, Feedback.feedback_giver == passenger).all()

def check_if_driver_gave_feedback(ride_id, passenger):
    #to prevent duplicate entries.
    return Feedback.query.filter(Feedback.ride_id == ride_id, Feedback.feedback_receiver == passenger).all()


def get_user_profile(profile_id):

    return UserProfile.query.filter(UserProfile.profile_id == profile_id).first()

def create_user_profile(image, location, title, profile_id):

    user_profile = UserProfile(profile_id = profile_id, image = image, location = location, title = title)
    db.session.add(user_profile)
    db.session.commit()
