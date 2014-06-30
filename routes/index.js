var express = require('express')
  , sqlite3 = require('sqlite3').verbose()
  , ready = false;
;

var router = express.Router();

db = new sqlite3.Database('recipes.db', sqlite3.OPEN_READONLY, function(err) {
   if(!err){
     ready=true;
   }
});

/* GET home page. */
router.get('/', function(req, res) {
  if (ready) {
   var recipes = [];
   db.serialize(function() {
      db.each("SELECT name AS name FROM recipe;", function(err, row){
         if (err) {
            res.err("err:"+err);
         }
         recipes.push(row.name);
      }, function() {
         res.render('index', { 
            title: 'Recipe.db',
            recipes: recipes
         });
      });
   });
  } else {
   res.end('the database is not ready');
  }
});

module.exports = router;
