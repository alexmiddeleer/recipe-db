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

router.get('/recipes', function(req, res) {
   dbal.getRecipes(testUser, function(recipes) {
      modelReady(res, recipes);
   }, dbNotReady);
});

router.get('/recipe/:recipeID', function(req, res) {
   recipeID = req.params.recipeID;
   dbal.getRecipe(testUser, recipeID, function(recipe) {
      modelReady(res, recipe);
   }, dbNotReady);
});

router.post('/new-recipe/', function(req, res) {
   var data = {
      ingredients    : req.body.ingredients,
      categories     : req.body.categories,
      instructions   : req.body.instructions
   };

   dbal.newRecipe(data, dbNotReady, function(success) {
      res.json({'success':success});
   });
});

module.exports = router;
