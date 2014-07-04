var express = require('express')
   , dbal = require('../dbal/dbal.js')
   , testUser = 1;
;

var router = express.Router();

function dbNotReady () {
  res.err('Sorry, the database is not ready.  Please try again in a moment');
}

function modelReady (res, recipe) {
   res.render('recipe', { 
      title: recipe.name,
      steps: recipe.steps
   });
}

/* GET home page. */
router.get('/:recipeID', function(req, res) {
   recipeID = req.params.recipeID;
   dbal.getRecipe(testUser, recipeID, function(recipe) {
      modelReady(res, recipe);
   }, dbNotReady);
});

module.exports = router;
