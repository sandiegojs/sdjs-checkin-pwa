# San Diego JS Checkin App

The project uses [LoopBack](http://loopback.io).

## Overview

The application is a progressive web app designed to be used on a small mobile device. The intended audience is attendees at a meetup. Organizers want an easy way for people to checkin when they arrive at an event so that we can understand how many people are attending, and which events people are attending.

This project uses React and Loopback. It uses Mongodb in production but in development mode locally it will store data in memory and persist it using a file on disk `data.json` to make it easier to debug.

## Setup

Install the dependencies:
```
$ npm install
```

Then run the app using:
```
$ npm start
```

The application will include:

* Web server listening at: http://localhost:3000

* Browse your REST API at http://localhost:3000/explorer

## CONTRIBUTING

Please feel free to add an issue, fork the repo, and open pull requests with improvements. The application is not yet ready for production the current needs include:

* We would like to be able to pull in events from `https://github.com/freeCodeCamp/chapter`

* The `totalAttendees.html` page needs to be styled. We don't want personal information here, because it is publically accessible, just info for everyone to see which events had how many people

* If you don't select an event from the dropdown the validation error does not get shown to users and it is confusing.

* and many more things...
