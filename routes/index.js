var express = require('express')
var router = express.Router()
var passport = require('passport')
var yelp = require('../yelp/init')
var freeGeoIp = require('../freegeoip/init')
var User = require('../models/user')
var ipAddress = require('../middlewares/ipaddress')
var getLocation = require('../middlewares/getlocation')

router.use(ipAddress.getIpAddress)
router.use(getLocation.getLocation)

/* GET home page. */
router.get('/', function (req, res, next) {
  yelp.search(req.fccNighlifeAppLocation, function (err, yelpResponse) {
    if (err) {
      var errData = JSON.parse(err.data)

      // We handle this error specifically.
      // We allow to render the home page, rather than throwing an error.
      if (errData.error.id == 'UNAVAILABLE_FOR_LOCATION') {
        return res.render('index', {
          title: 'Nighlife App',
          loggedIn: req.user ? true : false,
          yelpData: false
        })
      } else {
        return next(err)
      }
    }

    if (req.user) {
      User.findOne({ userId: req.user }, function (err, user) {
        if (err) return next(err)

        res.render('index', {
          title: 'Nighlife App',
          loggedIn: true,
          yelpData: yelpResponse,
          visitingPlaces: user.visiting
        })
      })
    } else {
      res.render('index', {
        title: 'Nighlife App',
        loggedIn: false,
        yelpData: yelpResponse
      })
    }
  })
})

router.post('/', function (req, res, next) {
  req.session.location = req.body.location
  res.redirect('/')
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', function (req, res, next) {
  passport.authenticate('twitter', function (err, user, info) {
    if (err) return next(err)

    req.logIn(user, function (err) {
      if (err) return next(err)

      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})

router.post('/is-going', function (req, res, next) {
  User.checkIfVisiting(req.user, req.body.yelpId, function (err, doc) {
    if (err) return next(err)

    // Toggles whether the user is visiting the business.
    if (doc) {
      User.update({ userId: req.user }, { $pull: { visiting: req.body.yelpId } }, function (err, rawResponse) {
        if (err) return next(err)

        res.json({
          'success': rawResponse,
          'state': 'not-going'
        })
      })
    } else {
      User.update({ userId: req.user }, { $push: { visiting: req.body.yelpId } }, function (err, rawResponse) {
        if (err) return next(err)

        res.json({
          'success': rawResponse,
          'state': 'going'
        })
      })
    }
  })
})

module.exports = router
