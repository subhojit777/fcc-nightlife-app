'use strict';

var exports = module.exports = {};
var OAuth = require('oauth');
require('dotenv').config();

var oauth = exports.oauth = new OAuth.OAuth(
  null,
  null,
  process.env.YELP_CONSUMER_KEY,
  process.env.YELP_CONSUMER_SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
);

exports.search = function(cb) {
  // @TODO change delhi location.
  oauth.get(
    'https://api.yelp.com/v2/search/?location=delhi',
    process.env.YELP_TOKEN,
    process.env.YELP_TOKEN_SECRET,
    function(e, data, res) {
      if (e) cb(e);
      cb(null, data);
    }
  );
}
