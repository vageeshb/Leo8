'use strict';

module.exports = {
  index: function(req, res) {
    res.render('home', { user: req.user });  
  }
};