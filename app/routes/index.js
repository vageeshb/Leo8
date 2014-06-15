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
  app.post('/login', passport.authenticate('login', {
    successRedirect : '/profile', // Authentication successful
    failureRedirect : '/login',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/') ;
  });
  
  app.get('/profile', isAuthenticated, userRoutes.profile);
  app.get('/users/manage',  userRoutes.adminDashboard);
  app.get('/users/add',  userRoutes.add);
  app.post('/users/add', passport.authenticate('signup', {
    successRedirect : '/users/manage', // Authentication successful
    failureRedirect : '/users/add',   // Authentication failure
    failureFlash    : true        // Show flash in failure
  }));
  app.get('/users/:id/edit', userRoutes.edit);
  app.post('/users/:id/edit', userRoutes.update);
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
  app.get('/inventory/new', itemRoutes.new);
  app.post('/inventory/new', itemRoutes.create);
  app.get('/inventory/:id', itemRoutes.view);
  app.delete('/inventory/:id', itemRoutes.delete);
  app.get('/inventory/:id/edit', itemRoutes.edit);
  app.post('/inventory/:id', itemRoutes.update);

  // Company Routes
  // ========================================================
  app.get('/companies', companyRoutes.index);
  app.get('/company/new', companyRoutes.new);
  app.post('/company/new', companyRoutes.create);
  app.delete('/company/:id', companyRoutes.delete);
  app.get('/company/:id/edit', companyRoutes.edit);
  app.post('/company/:id', companyRoutes.update);
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