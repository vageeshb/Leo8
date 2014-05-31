'use strict';

module.exports = {
  index: function(req, res) {
    res.render('home', { title: 'Starter Kit', user: req.user });  
  }
};