'use strict';

var home = require('./home'),
  user = require('./user');

module.exports = function(app, passport) {
  
  app.get('/', isAuthenticated, home.index);

  app.get('/login', user.login);
  
};

// User authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}