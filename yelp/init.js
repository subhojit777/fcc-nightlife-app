'use strict';

var exports = module.exports = {};
var OAuth = require('oauth');
require('dotenv').config();

export.search = function(cb) {
  var oauth = new OAuth.OAuth(
    null,
    null,
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0',
    null,
    'HMAC-SHA1'
  );

  // @TODO change delhi location.
  oauth.get(
    'https://api.yelp.com/v2/search/?location=delhi',
    process.env.TOKEN,
    process.env.TOKEN_SECRET,
    function(e, data, res) {
      if (e) cb(e);
      cb(null, data);
    }
  );
}
