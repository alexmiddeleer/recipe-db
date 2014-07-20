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
   var ingredients = req.body.ingredients;
   var categories  = req.body.categories;
   var instructions  = req.body.instructions;
   console.log(ingredients);
   console.log(instructions);
   console.log(categories);
});

module.exports = router;
