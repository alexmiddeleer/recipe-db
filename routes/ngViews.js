// -------------------------------------
// This file routes angular views; should be simple.
// ------------------------------------

var express = require('express')
  , router = express.Router();

// -------------------------------------
// Use this function to add a new view.
// Still using Jade to render ng-views, 
// that might change if it proves to be annoying.
// ------------------------------------
function register (viewName) {
   router.get('/' + viewName, function(req, res) {
      res.render(viewName, { 
         title: 'Recipe.db'
      });
   });
}

register('recipe-list');
register('recipe');
register('new-recipe');

module.exports = router;
