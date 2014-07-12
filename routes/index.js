var express = require('express')
  , dbal = require('../dbal/dbal.js')
  , testUser = 1;
;

var router = express.Router();

// Return home page
router.get('/', function(req, res) {
   res.render('layout');
});

module.exports = router;
