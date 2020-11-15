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

    request = db.relationship('Request')
    user = db.relationship('User') #in order to get the user's first name and last name for search results

    def __repr__(self):
        return f'RIDE_ID = {self.ride_id} DRIVER = {self.driver_id} WITH {self.seats} SEATS {self.start_loc} TO {self.end_loc}'

    def serialize(self):
        return {'ride_id': self.ride_id, 'driver': self.driver_id, 'seats': self.seats,
        'date': self.date, 'start_loc': self.start_loc, 'end_loc': self.end_loc, 
        'price': self.price, 'comments': self.comments, "driver_fname" : self.user.first_name, 
        "driver_lname": self.user.last_name }

class Request(db.Model):
    """A list of users requests."""
    __tablename__ = "requests"

    request_id = db.Column(db.Integer, primary_key = True, autoincrement = True, unique = True)
    ride_id = db.Column(db.Integer, db.ForeignKey('rides.ride_id'), nullable = False)
    rider_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
    seats_requested = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String)

    user = db.relationship('User') #backreffed
    ride = db.relationship('Ride') #backreffed
    
    def __repr__(self):
        return f'<Requests request_id = {self.request_id} ride_id = {self.ride_id} rider_id = {self.rider_id} status = {self.status} seats_requested={self.seats_requested}>'

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



# class TravelList(db.Model):

#     __tablename__ = "travel_list"

#     list_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable = False)
#     list_item = db.Column(db.String)

#     def __repr__(self):
#         return f'<List_item = {self.list_item} list_id = {self.list_id} user_id = {self.user_id}>'

#     def serialize(self):
#         return {'list_id': self.list_id, 'user_id': self.user_id, 'list_item': self.list_item}
