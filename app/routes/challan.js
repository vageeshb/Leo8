'use strict';
var Item = require('../models/items'),
  Challan = require('../models/challan');

module.exports = {
  getList: function(req, res) {
    Challan.find().sort({id: 1}).exec( function(err, challans) {
      if(err) throw err;
      res.render('challan/index', {
        user: req.user,
        challans: challans
      });
    });
  },
  getNew: function(req, res) {
    Item.find().sort({name: 1}).exec( function(err, data) {
      if (err) console.log(err);
      res.render('challan/new', {
        user : req.user,
        items: data
      });  
    });
  },
  postNew: function(req, res) {
    var len, item,
      obj = req.body,
      newChallan = new Challan();
    
    if(typeof(req.body.itemName) == 'string') {
      item = new Item();
      item.name = obj.itemName;
      item.qty = obj.itemQty;
      newChallan.items.push(item);
    }
    else {
      len = req.body.itemName.length;
      for (var i = 0; i < len; i++) {
        item = new Item();
        item.name = obj.itemName[i];
        item.qty = obj.itemQty[i];
        newChallan.items.push(item);
      }
    }
    newChallan.save(function(err, data) {
      res.redirect('/challan');
    });
  }
};