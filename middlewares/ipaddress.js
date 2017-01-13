'use strict'

var exports = module.exports = {}
require('dotenv').config({
  silent: true
})

exports.getIpAddress = function (req, res, next) {
  // Obtain the requester's IP.
  // This becomes necessary when you are accessing the microservice from Heroku.
  // https://lostechies.com/derickbailey/2013/12/04/getting-the-real-client-ip-address-on-a-heroku-hosted-nodejs-app
  if (process.env.ENV != 'local') {
    var ipAddr = req.headers['x-forwarded-for']
    if (ipAddr) {
      var list = ipAddr.split(',')
      req.fccNighlifeAppIpAddress = list[list.length - 1]
    } else {
      req.fccNighlifeAppIpAddress = req.connection.remoteAddress
    }
  } else {
    req.fccNighlifeAppIpAddress = process.env.IP_ADDRESS
  }

  next()
}
