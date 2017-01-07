'use strict';

var exports = module.exports = {};
var request = require('request');

exports.freeGeoIpData = function(ipAddress, cb) {
  request('http://freegeoip.net/json/' + ipAddress, function (err, response, body) {
    if (err) cb(err);

    if (response.statusCode != 200) cb('Unable to fetch freegeoip data: ' + response);

    cb(null, JSON.parse(body));
  });
}
