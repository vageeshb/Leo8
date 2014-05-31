'use strict';
var _ = require('underscore');

exports.error = function(err) {
  var error = [];
  _.keys(err.errors).forEach( function(name) {
    error.push("'" + name.toUpperCase() + "' is required!");
  });
  return error;
};