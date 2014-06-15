'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
counters = require('./counters');

var contactSchema = {
  name: {type: String, required: true},
  designation: {type: String}
};

var companySchema = new Schema({
  companyId: {type: String},
  name: {type: String, required: true},
  description:{type: String},
  representatives: [contactSchema]
});

companySchema.pre('save', function (next) {
  
  if(!this.isNew)
    next();

  var company = this;
  
  counters.getNext('Company', function(err, seq) {
    if(err) throw err;
    company.comapanyId = 'C_' + seq;
    next();
  });
});

module.exports = mongoose.model('Company', companySchema);