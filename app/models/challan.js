'use strict';

var mongoose = require('mongoose'),
  Item = require('./items');

var challanSchema = mongoose.Schema({
  id: {type: Number},
  items: [Item.schema],
  status: {type: String}
});

// Export Challan model
module.exports = mongoose.model('Challan', challanSchema);