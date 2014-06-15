'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,

// Collection to hold counters/sequences for ids
CountersSchema = new Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, required: true }
},{
  versionKey: false
});

var Counters = mongoose.model('Counters', CountersSchema);

module.exports = {
  getNext : function(collection, callback) {
    var query = {_id: collection};
    var update = {$inc: {sequence: 1}};
    var options = {upsert: true};
    Counters.findOneAndUpdate(query, update, options, function(err, counter)
    {
      callback(err, counter.sequence);
    });
  }
};