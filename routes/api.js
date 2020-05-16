var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/profile', function(req, res, next) {
  res.send('Express RESTful API');
});

module.exports = router;
