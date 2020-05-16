var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/User");

var router = express.Router();

/* GET home page. */
/*router.get('/profile', function(req, res, next) {
  res.send('Express RESTful API');
});*/

// -- register route
router.post('/signup', function(req, res) {
  // console.log(req.body);
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.json({success: false, msg: 'Please pass name, email and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'User with this email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// -- login route
router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// -- profile route accessible to authorized user only
router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    res.json({success: true, msg: 'Successful call.'});
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
