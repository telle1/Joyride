"""Models for Joyride."""
import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from random import choice, randint

db = SQLAlchemy()

class User(db.Model):
    """A user."""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, unique = True, nullable = False)
    phone_num = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)

    request = db.relationship('Request')
    ride = db.relationship('Ride')
    profile = db.relationship('UserProfile', uselist=False)
    messages = db.relationship('Message')

    def serialize(self):
        return {'first_name': self.first_name, 'last_name': self.last_name, 'email': self.email, 'phone_num': self.phone_num}

    def __repr__(self):
        return f'<User user_id ={self.user_id} email = {self.email} name = {self.first_name} test>'

class Ride(db.Model):
    """A ride."""
    __tablename__ = "rides"

    ride_id= db.Column(db.Integer, primary_key = True, autoincrement = True, unique = True)
    driver_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    date = db.Column(db.DateTime, nullable = False)
    start_loc = db.Column(db.String, nullable = False)
    end_loc = db.Column(db.String, nullable = False)
    seats = db.Column(db.Integer, nullable = False)
    price = db.Column(db.Integer, nullable = False)
    comments = db.Column(db.Text, nullable = True)
    deleted_at = db.Column(db.DateTime, nullable = True)

    request = db.relationship('Request')
    user = db.relationship('User') #in order to get the user's first name and last name for search results

    def __repr__(self):
        return f'RIDE_ID = {self.ride_id} DRIVER = {self.driver_id} WITH {self.seats} SEATS {self.start_loc} TO {self.end_loc}'

    def serialize(self):
        return {'ride_id': self.ride_id, 'driver': self.driver_id, 'seats': self.seats,
        'date': self.date.strftime("%A, %B %d %Y"), 'start_loc': self.start_loc, 'end_loc': self.end_loc, 
        'price': self.price, 'comments': self.comments, "driver_fname" : self.user.first_name, 
        "driver_lname": self.user.last_name, 'passengers': [], 'requests': []}

class Request(db.Model):
    """A list of users requests."""
    __tablename__ = "requests"

    request_id = db.Column(db.Integer, primary_key = True, autoincrement = True, unique = True)
    ride_id = db.Column(db.Integer, db.ForeignKey('rides.ride_id'), nullable= False) 
    rider_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    seats_requested = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String)
    date = db.Column(db.DateTime, nullable = False)

    user = db.relationship('User') #backreffed
    ride = db.relationship('Ride') #backreffed
    
    def __repr__(self):
        return f'<Requests request_id = {self.request_id} ride_id = {self.ride_id} rider_id = {self.rider_id} status = {self.status} seats_requested={self.seats_requested}>'

    def serialize_passenger_info(self): #for current drives page (to see info about the passenger)
        return {'req_id': self.request_id, 'user_id': self.user.user_id,
                'name': [self.user.first_name, self.user.last_name], 
                'email': self.user.email, 'phone_num': self.user.phone_num, 
                'seats_requested': self.seats_requested}

    def serialize_ride_info(self): #for current rides page (to see info about the driver)
        return {'request_id': self.request_id, 'ride_id': self.ride.ride_id,
            'date': self.ride.date.strftime("%A, %B %d %Y"), 'req_date': self.date,
            'start_loc': self.ride.start_loc, 'end_loc': self.ride.end_loc,
            'cost': self.ride.price, 'status': self.status,
            'seats_available': self.ride.seats,'seats_requested': self.seats_requested,
            'driver': {'user_id': self.ride.user.user_id,
                'first_name': self.ride.user.first_name, 'last_name': self.ride.user.last_name,
                'email': self.ride.user.email, 'phone_num': self.ride.user.phone_num}}

class Feedback(db.Model):
    """A list of user feedback for rides."""
    __tablename__ = "feedback"

    feedback_id = db.Column(db.Integer, primary_key = True, autoincrement = True, unique = True)
    feedback = db.Column(db.Text, nullable = False)
    rating = db.Column(db.Integer, nullable= False)
    feedback_giver = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)    
    feedback_receiver = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)    
    ride_id = db.Column(db.Integer, db.ForeignKey('rides.ride_id'), nullable = False)

    def __repr__(self):
        return f"<Feedback msg={self.feedback} rating={self.rating} giver={self.feedback_giver} receiver={self.feedback_receiver} ride_id={self.ride_id}>"

class UserProfile(db.Model):
    """User profiles."""

    __tablename__ = 'profiles'

    profile_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key = True)
    title = db.Column(db.String)
    image = db.Column(db.String)
    location = db.Column(db.String)

    user = db.relationship('User', uselist=False)

    def __repr__(self):
        return f"<Profile id={self.profile_id} location={self.location} title={self.title}>"

class Conversation(db.Model):
    """Conversation between two users."""

    __tablename__ = 'conversations'

    conversation_id = db.Column(db.Integer, primary_key= True, unique = True)
    user_1 = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    user_2 = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)

    user1_userinfo = db.relationship('User', foreign_keys= [user_1])
    user2_userinfo = db.relationship('User', foreign_keys=[user_2])
    message = db.relationship('Message')

    def __repr__(self):
        return f"<Conversation id={self.conversation_id}>"

class Message(db.Model):
    """All messages for a given conversation."""

    __tablename__ = 'messages'

    message_id = db.Column(db.Integer, primary_key= True, autoincrement = True, unique = True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.conversation_id'), nullable= False)
    sender = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, nullable = False)

    # user = db.relationship('User')
    conversation = db.relationship('Conversation')

def connect_to_db(flask_app, db_uri='postgresql:///joyride', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)



# test = Feedback(feedback = 'Smooth ride', rating = 5, feedback_giver=2, feedback_receiver=6, ride_id=54)
# db.session.add(test)
# db.session.commit()

# request = Request(ride_id = 28, rider_id = 6, seats_requested = 1, status='Denied', date= datetime.now())
# db.session.add(request)
# db.session.commit()

