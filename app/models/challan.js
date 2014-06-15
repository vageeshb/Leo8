'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
counters = require('./counters'),

challanSchema = new Schema({
  challanId: {type: String},
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
  owner: {type: String},
  created: {type: Date}
});

challanSchema.pre('save', function(next) {
  if(!this.isNew)
    next();

  var challan = this;

  counters.getNext('Challan', function(err, seq) {
    if(err) throw err;
    challan.challanId = 'CH_' + seq;
    challan.created = new Date();
    next();
  });
});

module.exports = mongoose.model('Challan', challanSchema);