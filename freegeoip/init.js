'use strict';

var exports = module.exports = {};
require('dotenv').config();
var request = require('request');

exports.freeGeoIpData = function(cb) {
  request('http://freegeoip.net/json/' + process.env.IP_ADDRESS, function (err, response, body) {
    if (err) cb(err);

    if (response.statusCode != 200) cb('Unable to fetch freegeoip data: ' + response);

    cb(null, body);
  });
}
