var express = require('express')
   , dbal = require('../dbal/dbal.js')
   , testUser = 1;
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
   // console.log(req.body);
   var data = {
      ingredients   : req.body.ingredients,
      categories    : req.body.categories,
      instructions  : req.body.instructions,
      name          : req.body.name,
      source        : req.body.source,
      author        : req.body.author,
      serves        : req.body.serves,
      cookTimeHrs   : req.body.cookTimeHrs,
      cookTimeMins  : req.body.cookTimeMins
   };
   // console.log('data is :');
   // console.log(data);

   dbal.newRecipe(data, function(err, data) {
      if (err) {
         console.log(err);
      };
      res.json(data);
   });
});

module.exports = router;
