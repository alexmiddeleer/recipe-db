var express = require('express')
  , router = express.Router();

function register (viewName) {
   router.get('/' + viewName, function(req, res) {
      res.render(viewName, { 
         title: 'Recipe.db'
      });
   });
}

register('recipe-list');
register('recipe');

module.exports = router;
