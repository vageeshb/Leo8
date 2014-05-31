'use strict';

var home = require('./home'),
  user = require('./user');

module.exports = function(app, passport) {
  
  app.get('/', home.index);

  app.get('/login', user.getLogin);

  app.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', // Authentication successful
    failureRedirect : '/login',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));

  app.get('/signup', user.getSignup);
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile', // Authentication successful
    failureRedirect : '/signup',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));
  
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/') ;
  });
};

// User authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}