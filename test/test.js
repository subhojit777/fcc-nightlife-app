'use strict'

var chai = require('chai')
var assert = chai.assert
var should = chai.should()

describe('Yelp', function () {
  var yelp = require('../yelp/init')

  describe('oauth init', function () {
    it('should return an object', function (done) {
      assert.isNotNull(yelp.oauth)
      yelp.oauth.should.be.an('object')

      done()
    })
  })

  describe('search', function () {
    it('should return a json response', function (done) {
      // Maybe the Yelp response can be slow.
      this.timeout(5000)

      yelp.search('Delhi', function (err, data) {
        if (err) return done(err)

        assert.isNotNull(data)
        data.should.be.an('object')

        done()
      })
    })
  })
})

describe('FreeGeoIp', function () {
  var freeGeoIp = require('../freegeoip/init')

  describe('freeGeoIpData', function () {
    it('should return a json response', function (done) {
      // Maybe the Yelp response can be slow.
      this.timeout(5000)

      freeGeoIp.freeGeoIpData(process.env.IP_ADDRESS, function (err, data) {
        if (err) return done(err)

        assert.isNotNull(data)
        data.should.be.an('object')

        done()
      })
    })
  })
})
