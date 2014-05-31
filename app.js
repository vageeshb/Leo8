#!/usr/bin/env node

var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  db = require('./config/db'),
  pass = require('./config/passport'),
  passport = require('passport');


// Database
mongoose.connect(db.url);

// Authentication
require('./config/passport.js')(passport);

// Configurations
require('./config/config')(app, passport);

// Consolidated Routes
require('./app/routes/')(app, passport);

require('./config/errorhandler')(app);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
