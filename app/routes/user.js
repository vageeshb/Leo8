'use strict';

module.exports = {
  getLogin: function(req, res) {
    res.render('users/login', {title: 'asd'});
  },

  getSignup: function(req, res) {
    res.render('users/signup', )
  }

};