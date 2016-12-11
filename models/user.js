'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
  userId: Number,
  name: String,
  displayName: String
});
userSchema.plugin(findOrCreate);

var user = mongoose.model('User', userSchema);

module.exports = user;
