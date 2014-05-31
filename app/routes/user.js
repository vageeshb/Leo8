'use strict';

module.exports = {
  getLogin: function(req, res) {
    res.render('users/login', { user: req.user, message: req.flash('error') });

  },
  getSignup: function(req, res) {
    res.render('users/signup', {user: req.user, message: req.flash('error') });
  }

};