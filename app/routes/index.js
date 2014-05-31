'use strict';

var home = require('./home'),
  user = require('./user'),
  challan = require('./challan'),
  items = require('./items');

module.exports = function(app, passport) {
  
  app.get('/', home.index);

  // User
  // ========================================================
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
  // ========================================================
  
  app.get('/profile', isAuthenticated, isAdmin);

  // Challan
  // ========================================================
  app.get('/challan', challan.getList);
  app.get('/challan/new', challan.getNew);
  app.post('/challan/new', challan.postNew);

  // Inventory Items
  // ========================================================
  app.get('/inventory/list', items.list);
  app.get('/inventory/new', items.getNew);
  app.post('/inventory/new', items.postNew);
  app.get('/inventory/:id', items.view);
};

// User authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Admin Authenticat
function isAdmin(req, res) {
  if (req.user.role == 1) { 
    res.render('users/admin',{user: req.user, role: 'Admin'});
  } else {
    res.render('users/profile',{user: req.user, role: 'Non-admin'});
  }
  
}