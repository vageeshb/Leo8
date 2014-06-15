'use strict';
var Item = require('../models/item'),
  Company = require('../models/company'),
  Challan = require('../models/challan');

module.exports = {
  index: function(req, res) {
    var user = req.user;
    if(user.role == 1) {
      Challan.find().sort({id: 1}).exec( function(err, challans) {
        if(err) throw err;
        res.render('challan/index', {
          user: req.user,
          challans: challans
        });
      });
    }
    else {
      Challan.find({owner: user.name}).sort({id: 1}).exec( function(err, challans) {
        if(err) throw err;
        res.render('challan/index', {
          user: req.user,
          challans: challans
        });
      });
    }
  },
  new: function(req, res) {
    Item.find().sort({name: 1}).exec( function(err, items) {
      if (err) console.log(err);
      Company.find().sort({name: 1}).exec( function(err, companies) {
        if (err) console.log(err);
        res.render('challan/new', {
          user : req.user,
          items: items,
          companies: companies
        });    
      });
    });
  },
  create: function(req, res) {
    var len,
      obj = req.body,
      items = [],
      challan = new Challan();

    if(!(req.body.itemName instanceof Array)) {
      items.push({
        name: obj.itemName,
        qty: obj.itemQty,
        out: obj.itemOut,
        in: obj.itemIn,
        to: {
          companyName: obj.itemToCompanyName,
          repName: obj.itemToRepName
        },
        from: obj.itemFrom
      });
      updateQuantity(obj.itemName, obj.itemQty * -1);
    }
    else {
      len = req.body.itemName.length;
      for (var i = 0; i < len; i++) {
        items.push({
          name: obj.itemName[i],
          qty: obj.itemQty[i],
          out: obj.itemOut[i],
          in: obj.itemIn[i],
          to: {
            companyName: obj.itemToCompanyName[i],
            repName: obj.itemToRepName[i]
          },
          from: obj.itemFrom[i]
        });
        updateQuantity(obj.itemName[i], obj.itemQty[i] * -1);
      }
    }

    challan.items = items;
    challan.owner = req.user.name;
    challan.status = false;

    challan.save(function(err, data) {
      if (err)
        console.log(err);
      res.redirect('/challans');
    });
  },

  updateStatus: function(req, res) {
    var status = req.params.status,
    id = req.params.id;

    if(status === 'complete')
      status = true;
    else
      status = false;
    Challan.findByIdAndUpdate(id, {status: status}, function(err, challan) {
      if(err) throw err;
      challan.items.forEach( function(item, next) {
        if(status)
          updateQuantity(item.name, item.qty);
        else
          updateQuantity(item.name, item.qty * -1);
        if(challan.items.indexOf(item) === challan.items.length-1)
          res.send(true);
      });
    });
  }
};

function updateQuantity(itemName, qty) {
  Item.findOne({name: itemName}, function(err, item) {
    if(err) throw err;
    var oldQty = item.qty,
    newQty = item.qty + qty;
    Item.findByIdAndUpdate( item._id, {qty: newQty}, function(err, updtItem) {
      console.log('Updated ' + updtItem.name + '\'s quantity from ' + oldQty + ' to ' + newQty);
    });
  });
}