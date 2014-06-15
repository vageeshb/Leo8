'use strict';

var Item = require('../models/item'),
  helpers = require('../helpers/helpers');

module.exports = {
  index: function(req, res) {
    Item.find({}).sort({name: 1}).exec( function(err, items) {
      if(err) console.log(err);
      res.render('items/index', {
        user: req.user,
        items: items
      });
    });
  },
  list: function(req, res) {
    Item.find({qty: {$gte: 1}}).sort({name: 1}).exec( function(err, items) {
      if(err) throw err;
      res.json(items);
    });
  },
  view: function(req, res) {
    Item.findById(req.params.id, function(err, item) {
      res.json(item.qty);
    });
  },
  delete: function(req, res) {
    Item.remove({_id: req.params.id}, function(err, result) {
      if(err)
        res.json({ msg:'error: ' + err });
      else
        res.json({ msg: '' });
    });
  },
  new: function(req, res) {
    res.render('items/new', {user: req.user});
  },
  create: function(req, res) {
    var item = new Item();


    item.name = req.body.name;
    item.qty = req.body.qty;
    item.value = req.body.value;
    item.description = req.body.desc;
    item.brand = req.body.brand;
    item.model = req.body.model;

    item.save(function(err, data) {
      if(err) { 
        var errorObj = {
            name: err.name,
            type: 'danger',
            message: err.message,
            errors: helpers.error(err)
          };
        res.render('items/new', {
          user: req.user, 
          error: errorObj 
        }); 
      } else {
        res.render('items/new', {
          user: req.user, 
          message: 'Item added successfully!' 
        }); 
      }
    });
  },

  edit: function(req, res) {
    Item.findById(req.params.id, function(err, item) {
      res.render('items/edit', {
        user: req.user,
        item: item
      });
    });
  },

  update: function(req, res) {
    var id = req.params.id,
    
    newItem = new Item();

    newItem.name = req.body.name;
    newItem.qty = req.body.qty;
    newItem.value = req.body.value;
    newItem.description = req.body.desc;
    newItem.brand = req.body.brand;
    newItem.model = req.body.model;

    newItem = newItem.toObject();
    delete newItem._id;

    Item.update({_id : id}, newItem, function(err, data) {
      if(err) { 
        console.log(err);
        var errorObj = {
            name: err.name,
            type: 'danger',
            message: err.message,
            errors: helpers.error(err)
          };
        res.render('items/edit', {
          user: req.user, 
          error: errorObj 
        }); 
      } else {
        // TODO
        res.redirect('/inventories');
      }
    });
  }
};