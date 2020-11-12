from model import db, User, Ride, TravelList, Request, connect_to_db
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
    return Ride.query.filter(Ride.start_loc == start_loc, Ride.end_loc == end_loc, Ride.date > current_time).all()

def get_request(ride_id, rider_id):
    """Return requests for a certain ride made by a certain user."""
    return Request.query.filter(Request.ride_id == ride_id, Request.rider_id == rider_id).first()

def get_request_by_request_id(request_id):
    """Return requests by request_id"""
    return Request.query.filter(Request.request_id == request_id).first()

def get_current_user_drives(driver_id):
    """Return current rides where the user drives."""
    # return Ride.query.filter(Ride.driver_id == driver_id, Ride.date > current_time).all()
    drives = Ride.query.filter(Ride.driver_id == driver_id, Ride.date > current_time)
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

def create_new_travel_list_item(user_id, list_item):

    new_travel_list_item = TravelList(user_id = user_id, list_item = list_item)
    db.session.add(new_travel_list_item)
    db.session.commit()

def get_user_travel_list(user_id):
    """Get the current user's travel list."""
    return TravelList.query.filter(TravelList.user_id == user_id).all()


