'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var contactSchema = {
  name: {type: String, required: true},
  designation: {type: String}
};

module.exports = mongoose.model('Company', new Schema({
  name: {type: String, require: true},
  description:{type: String},
  representatives: [contactSchema]
}));