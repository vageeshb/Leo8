'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
counters = require('./counters'),

itemSchema = new Schema({
  itemId: {type: String},
  name: { type: String, required: true},
  brand: { type: String},
  model: {type: String},
  qty: {type: Number, required: true},
  value: {type: Number},
  description: {type: String}
});

itemSchema.pre('save', function (next) {
  
  if(!this.isNew)
    next();

  var item = this;

  counters.getNext('Item', function(err, seq) {
    if(err) throw err;
    item.itemId = 'I_' + seq;
    next();
  });
});

module.exports = mongoose.model('Item', itemSchema);