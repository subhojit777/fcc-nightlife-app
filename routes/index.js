var express = require('express');
var router = express.Router();
var passport = require('passport');
var yelp = require('../yelp/init');
var freeGeoIp = require('../freegeoip/init');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  freeGeoIp.freeGeoIpData(function(err, freeGeoIpResponse) {
    if (err) next(err);

    yelp.search(freeGeoIpResponse['city'], function(err, yelpResponse) {
      if (err) next(err);

      if (req.user) {
        User.findOne({ userId: req.user }, function(err, user) {
          if (err) next(err);

          res.render('index', {
            title: 'Nighlife App',
            loggedIn: true,
            yelpData: yelpResponse,
            visitingPlaces: user.visiting
          });
        });
      }
      else {
        res.render('index', {
          title: 'Nighlife App',
          loggedIn: false,
          yelpData: yelpResponse
        });
      }
    });
  });
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', function(req, res, next) {
  passport.authenticate('twitter', function(err, user, info) {
    if (err) return next(err);

    req.logIn(user, function(err) {
      if (err) return next(err);

      return res.redirect('/');
    });
  })(req, res, next);
});

router.post('/is-going', function(req, res, next) {
  // get existing visiting places
  if (req.user) {
    User.update({userId: req.user}, {$push: {visiting: req.body.yelpId}}, function(err, rawResponse) {
      if (err) next(err);

      res.json({'success': rawResponse});
    });
  }
});

module.exports = router;
