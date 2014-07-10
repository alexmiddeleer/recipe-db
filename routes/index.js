var express = require('express')
   , dbal = require('../dbal/dbal.js')
   , testUser = 1;
;

var router = express.Router();

function dbNotReady () {
  res.err('Sorry, the database is not ready.  Please try again in a moment');
}

function modelReady (res, recipes) {
   res.json(recipes);
}

/* GET data for home page */
router.get('/data/recipes', function(req, res) {
   dbal.getRecipes(testUser, function(recipes) {
      modelReady(res, recipes);
   }, dbNotReady);
});

/* GET home page. */
router.get('/', function(req, res) {
   res.render('index', { 
      title: 'Recipe.db'
   });
});

module.exports = router;
