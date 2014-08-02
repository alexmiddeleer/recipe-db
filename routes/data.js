var express = require('express')
   , dbal = require('../dbal/dbal.js')
   , newRecipeFilter = require('../filters/new-recipe-filter.js')
   , testUser = 1
;

var router = express.Router();

function dbNotReady (res) {
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
   var result = newRecipeFilter.filter(req.body);
   if (result.valid) {
      dbal.newRecipe(result.data, function(err, data) {
         if (err) {
            res.json({
               success:false,
               errors:[err]
            });
         } else {
            res.json({
               success:true,
               data:data
            });
         }
      });
   } else {
      res.json({
         success:false,
         errors: result.errors,
         missing: result.missing
      });
   }
});

module.exports = router;
