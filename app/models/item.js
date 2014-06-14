'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({
  name: { type: String, required: true},
  brand: { type: String},
  model: {type: String},
  qty: {type: Number, required: true},
  value: {type: Number},
  description: {type: String}
}));