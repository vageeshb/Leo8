'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  role: String
});

userSchema.pre('save', function (next) {
  
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  if(err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateHash = function(password) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) throw err;

    bcrypt.hash(password, salt, function(err, hash) {
      if(err) throw err;
      return password;
    });
  });
};

// Export user model
module.exports = mongoose.model('User', userSchema);
exports.schema = userSchema;