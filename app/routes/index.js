'use strict';

var home = require('./home'),
  userRoutes = require('./user'),
  challanRoutes = require('./challan'),
  itemRoutes = require('./item'),
  companyRoutes = require('./company');

module.exports = function(app, passport) {

  app.get('/', home.index);

  // User
  // ========================================================
  app.get('/login', userRoutes.login);
  app.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', // Authentication successful
    failureRedirect : '/login',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));

  app.get('/signup', userRoutes.signup);
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile', // Authentication successful
    failureRedirect : '/signup',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));
  
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/') ;
  });
  
  app.get('/profile', isAuthenticated, userRoutes.profile);
  app.get('/manage', isAuthenticated, isAdmin, userRoutes.adminDashboard);
  app.delete('/user/:id', isAuthenticated, isAdmin, userRoutes.delete);

  // ========================================================
  // Challan
  // ========================================================
  app.get('/challans', challanRoutes.index);
  app.get('/challan/new', challanRoutes.new);
  app.post('/challan/new', challanRoutes.create);
  app.get('/challan/:id/status/:status', challanRoutes.updateStatus);

  // Inventory Items
  // ========================================================
  app.get('/inventories', itemRoutes.index);
  app.get('/inventory/list', itemRoutes.list);
  app.get('/inventory/new', itemRoutes.getNew);
  app.post('/inventory/new', itemRoutes.postNew);
  app.get('/inventory/:id', itemRoutes.view);
  app.delete('/inventory/:id', itemRoutes.delete);
  app.get('/inventory/:id/edit', itemRoutes.getEdit);
  app.post('/inventory/:id', itemRoutes.putEdit);

  // Company Routes
  // ========================================================
  app.get('/companies', companyRoutes.index);
  app.get('/company/new', companyRoutes.getNew);
  app.post('/company/new', companyRoutes.postNew);
  app.delete('/company/:id', companyRoutes.delete);
  app.get('/company/:id/edit', companyRoutes.getEdit);
  app.post('/company/:id', companyRoutes.putEdit);
  app.get('/company/:id/getReps', companyRoutes.getReps);
};

// User authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Admin Authenticat
function isAdmin(req, res, next) {
  if (req.user.role == 1) { 
    next();
  } else {
    res.redirect('/profile');
  }
  
}