'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: { type: String, required: true},
  qty: {type: Number, required: true}
});

// Export user model
module.exports = mongoose.model('Item', itemSchema);
exports.schema = itemSchema;