'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
  userId: Number,
  name: String,
  displayName: String,
  visiting: Array
});
userSchema.plugin(findOrCreate);
userSchema.index({userId: 1});

/**
 * Checks if user is visiting the Yelp business.
 *
 * @param int userId
 *   User id.
 * @param string yelpId
 *   Yelp business id.
 * @param Function cb
 *   Callback.
 */
userSchema.statics.checkIfVisiting = function(userId, yelpId, cb) {
  return this.findOne({ 'userId': userId, 'visiting': { $in: [ yelpId ] } }, cb);
}

var user = mongoose.model('User', userSchema);

module.exports = user;
