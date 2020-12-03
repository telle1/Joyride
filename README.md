# Joyride

## Table of Contents
* [Overview](#overview)
* [Tech Stack](#techstack)
* [Preview](#preview)

## Overview
Joyride is a long-distance community-based rideshare application built with React on the front-end and Python on the back-end. 
Users have a profile page where they can upload an image, description, and location, and check notifications as well as recent 
feedback from rides and drives. Users can search or post a ride with the aid of Google autocomplete, or use the chat feature to
message the driver. Drivers will get a text message notification when someone requests their ride through the Twilio API. They 
can navigate to their rides page where they can check, edit, or delete current drives and rides and approve rider requests. The 
rides page also shows the driver/rider's contact info and links to their profile. Users can rate their ride in the past ride section.

## Techstack
**Frontend:** React, Javascript, HTML/CSS, AOS, Bootstrap\
**Backend**: Python, Flask, SQLAlchemy, PostgreSQL\ 
**APIs:** Google Maps/Place, Twilio\
**Libraries**: Faker, Socket.IO, Moment.js, Typed.js\
**My LinkedIn:** https://www.linkedin.com/in/tiffany-luu0/

## Preview
## Homepage
* designed with CSS and Bootstrap
* React useRef hook to implement Typed.JS text animation\
<br/>

![Homepage](static/gifs/Homepage.gif)


## About Me
* made with manipulating CSS animation delays\
<br/>

![About Me](static/gifs/About_me.gif)

## Profile/Dashboard
* Signup/Login with React client-side form validation
* Editable profile with changes automatically reflected
* Notifications designed with Bootstrap\
<br/>

![Profile](static/gifs/Profile.gif)

## Post
* Google autocomplete/map implemented with useRef hook\
<br/>

![PostForm](static/gifs/PostRide.gif)

## Search
* User experience enhanced with Google Autocomplete
* Optional message to send driver via Twilio API
* Server side form validation to prevent an invalid seat request\
<br/>

![Search](static/gifs/SearchRides.gif)

## Messaging
* In-app messaging made with Flask socket.io\
<br/>

![Messaging](static/gifs/Messaging.gif)

## Current Drives/Rides
**Current Drives** 
* Edit, manage, and delete functionality
* Approve rider's requests \
<br/>

![CurrentDrives](static/gifs/CurrentDrives.gif)

**Current Rides**
* Ternary operators used to edit seats only if request is still pending
* Delete or cancel request depending on status\
<br/>

![CurrentRides](static/gifs/CurrentRides.gif)

**Both rides and drives** have modals to easily access driver/passenger contact info, also includes a link to view user's profile\
<br/>

![ContactModal](static/gifs/ContactModal.gif)

## Past Drives/Rides
* rating star component made with React\
<br/>

![PastRides](static/gifs/PastRides.gif)