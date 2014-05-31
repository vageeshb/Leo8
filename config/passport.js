'use strict';
// config/passport.js

// Loading prerequisites
var LocalStrategy = require('passport-local').Strategy;

// Load User model
var User = require('../app/models/user.js');

// Exposing passport functions to our app
module.exports = function (passport) {
  
  // ============================================
  // PASSPORT SESSION SETUP
  // ============================================
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // ============================================
  // LOCAL SIGNUP
  // ============================================

  passport.use('signup', new LocalStrategy(
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose username is the same as the forms username
      User.findOne({ 'username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }

        // check to see if theres already a user with that username
        if (user) {
          return done(null, false, {message:'That username is already taken.'});
        } 
        else {
          // if there is no user with that username
          // create the user
          var newUser       = new User();

          // set the user's local credentials
          newUser.username  = req.body.username;
          newUser.password  = req.body.password;
          newUser.role      = "1";
          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });    
    });
  }));

  // Login Strategy
  passport.use('login', new LocalStrategy(
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    process.nextTick(function() {
      User.findOne({'username' : username}, function(err, user) {
        // If there were any errors
        if(err)
          return done(err);
        // If no user was found with email
        if(!user)
          return done(null, false, {message: 'No user found!'});
        // If password was incorrect
        user.comparePassword(password, function (err, isMatch) {
          if(err) return done(null, false, {message: 'Invalid Password.'});
          if (isMatch) // No validation errors, successful login
            return done(null, user);
        });
      });
    });
  }));
};