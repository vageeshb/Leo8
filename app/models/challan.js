'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

module.exports = mongoose.model('Challan', new Schema({
  items: [{
    name: {type: String},
    qty: {type: Number},
    out: {type: String},
    in: {type: String},
    to: {
      companyName: {type: String},
      repName: {type: String}
    },
    from: {type: String}
  }],
  status: {type: Boolean},
  owner: {type: String}
}));