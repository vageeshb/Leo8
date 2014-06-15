'use strict';

var Challan = require('../models/challan'),
User = require('../models/user');

module.exports = {
  add: function(req, res) {
    res.render('users/add', {user: req.user, message: req.flash('error') });
  },
  edit: function(req, res) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
      if(err) throw err;
      res.render('users/edit', {user: req.user, editUser: user});
    });
  },
  update: function(req, res) {
    var id = req.params.id,
    obj = req.body;

    var updtUser = new User();

    updtUser.name = obj.name;
    updtUser.username = obj.username;
    updtUser.password = updtUser.generateHash(obj.password);
    updtUser.role = obj.role;

    console.log(updtUser.password);

    updtUser = updtUser.toObject();
    delete updtUser._id;

    User.findByIdAndUpdate(id, updtUser, function(err, user) {
      if(err) throw err;
      console.log(user);
      res.redirect('/users/manage');
    });
  },
  profile: function(req, res) {
    // Normal User
    if(req.user.role != 1) {
      var name = req.user.name;
      Challan.find({owner: name}).sort({_id: 1}).exec( function(err, challans) {
        if(err) throw err;
        if(challans.length > 0) {
          extractChallanInfo(challans, function(err, resChallans) {
            if(err) throw err;
            res.render('users/profile', { 
              user: req.user,
              challans: resChallans
            });        
          });
        } else {
          res.render('users/profile', { 
            user: req.user,
            challans: []
          });
        }
      });
    }
    // Admin User
    else {
      Challan.find().sort({_id: 1}).exec( function(err, challans) {
        if(err) throw err;
        if(challans.length > 0) {
          extractChallanInfo(challans, function(err, resChallans) {
            if(err) throw err;
            res.render('users/profile', { 
              user: req.user,
              challans: resChallans
            });        
          });
        } else {
          res.render('users/profile', { 
            user: req.user,
            challans: []
          });        
        }
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
      challanId: challan.challanId,
      owner: challan.owner,
      totalQty: totalQty,
      numberOfItems: numberOfItems,
      created: challan.created,
      status: challan.status
    };
    resChallans.push(challanObj);
    if(challans.indexOf(challan) === challans.length - 1) {
      cb(null, resChallans);
    }
  });
}