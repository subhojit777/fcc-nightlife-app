'use strict';

var freeGeoIp = require('../freegeoip/init');
var exports = module.exports = {};

exports.getLocation = function(req, res, next) {
  if (req.user && req.session.location) {
    req.fccNighlifeAppLocation = req.session.location;

    next();
  }
  else {
    freeGeoIp.freeGeoIpData(req.fccNighlifeAppIpAddress, function(err, freeGeoIpResponse) {
      if (err) next(err);

      req.fccNighlifeAppLocation = freeGeoIpResponse['city'];

      next();
    });
  }
}
