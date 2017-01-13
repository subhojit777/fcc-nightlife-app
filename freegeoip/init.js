'use strict'

var exports = module.exports = {}
var request = require('request')

exports.freeGeoIpData = function (ipAddress, cb) {
  request('http://freegeoip.net/json/' + ipAddress, function (err, response, body) {
    if (err) return cb(err)

    if (response.statusCode != 200) return cb('Unable to fetch freegeoip data: ' + response)

    cb(null, JSON.parse(body))
  })
}
