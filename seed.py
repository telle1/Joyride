import os
import json
from random import choice, randint
from flask_bcrypt import Bcrypt
from faker import Faker
from datetime import datetime

#import crud
from model import db, User, Ride, Request, UserProfile, connect_to_db
import server

os.system('dropdb joyride')
os.system('createdb joyride')
connect_to_db(server.app)
bcrypt = Bcrypt(server.app)
db.create_all()

fake = Faker() #initiate a faker object    
#Create 10 fake users
for i in range(1,11):
    email = f'user{i}@test.com'
    password = bcrypt.generate_password_hash('test').decode("utf-8")
    # first_name = f'test{i}'
    # last_name = f'test{i}'
    # fake_user = User(first_name = first_name, last_name = last_name, password= password, email= email, phone_num = '4088893883') 
    first_name = fake.first_name()
    phone_num = randint(1000000000,9999999999)
    fake_user = User(first_name = first_name, last_name = fake.last_name(), password= password, email= f"{first_name}{i}@gmail.com", phone_num = phone_num)
    db.session.add(fake_user)
    db.session.commit()
    #For each user create 10 fake rides
    for _ in range(1):
        # start_loc = f'teststart{_}'
        # end_loc = f'testend{_}'
        start_loc = "Los Angeles, CA, USA"
        end_loc = "San Francisco, CA, USA"
        fake_rides = Ride(driver_id = fake_user.user_id, seats = randint(1,4), date = fake.date_between_dates(date_start= datetime(2020, 9, 1), date_end = datetime(2021, 5, 1)), start_loc = start_loc, end_loc = end_loc, price = randint(1,50), comments='')
        db.session.add(fake_rides)
        db.session.commit()
    #For each ride, create 2 requests   
        # fake_user_rides = Request(ride_id= fake_rides.ride_id, rider_id = fake_user.user_id)
        # fake_user_rides_2 = Request(ride_id= fake_rides.ride_id, rider_id = 1)
        # db.session.add(fake_user_rides)
        # db.session.add(fake_user_rides_2)
        # db.session.commit()

