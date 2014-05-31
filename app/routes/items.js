'use strict';

var Items = require('../models/items'),
  helpers = require('../helpers/helpers');

module.exports = {
  list: function(req, res) {
    Items.find({}).sort({name: 1}).exec( function(err, data) {
      if(err) throw err;
      res.json(data);
    });
  },
  view: function(req, res) {
    Items.findById(req.params.id, function(err, item) {
      res.json(item.qty);
    });
  },
  getNew: function(req, res) {
    res.render('items/new', {user: req.user});
  },
  postNew: function(req, res) {
    var item = new Items();

    item.name = req.body.name;
    item.qty = req.body.qty;
    item.value = req.body.value;

    item.save(function(err, data) {
      if(err) { 
        var errorObj = {
            name: err.name,
            type: 'danger',
            message: err.message,
            errors: helpers.error(err)
          };
        res.render('items/new', {user: req.user, error: errorObj }); 
      } else {
        res.render('items/new', {user: req.user, message: 'Item added successfully!' }); 
      }
    });
  }
};