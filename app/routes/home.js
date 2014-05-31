'use strict';

module.exports = {
  index: function(req, res) {
    res.render('home', { title: 'Express', user: req.user });  
  }
};