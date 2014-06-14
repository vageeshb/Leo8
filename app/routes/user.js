'use strict';

var Challan = require('../models/challan'),
User = require('../models/user');

module.exports = {
  login: function(req, res) {
    res.render('users/login', { user: req.user, message: req.flash('error') });
  },
  signup: function(req, res) {
    res.render('users/signup', {user: req.user, message: req.flash('error') });
  },
  profile: function(req, res) {
    // Normal User
    if(req.user.role != 1) {
      var name = req.user.name;
      Challan.find({owner: name}).sort({_id: 1}).exec( function(err, challans) {
        if(err) throw err;
        extractChallanInfo(challans, function(err, resChallans) {
          if(err) throw err;
          res.render('users/profile', { 
            user: req.user,
            challans: resChallans
          });        
        });     
      });
    }
    // Admin User
    else {
      Challan.find().sort({_id: 1}).exec( function(err, challans) {
        if(err) throw err;
        extractChallanInfo(challans, function(err, resChallans) {
          if(err) throw err;
          res.render('users/profile', { 
            user: req.user,
            challans: resChallans
          });        
        });
      });
    }
  },
  adminDashboard: function(req, res) {
    User.find({}, function(err, users) {
      if(err) throw err;
      res.render('users/admin', {
        user: req.user,
        users: users
      });
    });
  },
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
      console.log('Removed user ' + user.name);
      if(err)
        res.send(err);
      else
        res.send(null);
    });
  }

};

function extractChallanInfo(challans, cb) {
  var resChallans = [];
  challans.forEach( function(challan) {
    var totalQty = 0,
    numberOfItems = challan.items.length;
    challan.items.forEach( function(item) {
      totalQty += item.qty;
    });
    var challanObj = {
      _id: challan._id,
      owner: challan.owner,
      totalQty: totalQty,
      numberOfItems: numberOfItems,
      status: challan.status
    };
    resChallans.push(challanObj);
    if(challans.indexOf(challan) === challans.length - 1) {
      cb(null, resChallans);
    }
  });
}