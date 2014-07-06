var express = require('express')
   , dbal = require('../dbal/dbal.js')
   , testUser = 1;
;

var router = express.Router();

function dbNotReady () {
  res.err('Sorry, the database is not ready.  Please try again in a moment');
}

function modelReady (res) {
   res.render('newRecipe', { 
      data:"goesHere"
   });
}

/* GET home page. */
router.get('/', function(req, res) {
   modelReady(res);
});

module.exports = router;
