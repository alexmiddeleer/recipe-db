var sqlite3 = require('sqlite3').verbose()
   , eventEmitter = new (require('events')).EventEmitter()
   , ready = false
   , db
   , dbName = 'recipes.db'
   , errNotRdy = 'The database failed to open'
   , recipeDM = require('./recipe.js')
;

db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY
   , function(err) {
       err && eventEmitter.emit('error', dbNotReady);
       ready=true;
   }
);

function getRecipes(userID, cb, notReady){
   if( ready ){
       recipeDM.getRecipes(db, userID, function(recipes) {
          cb(recipes);
       });
   } else {
      notReady(true);
   }
};

function getRecipe(userID, recipeID, cb, notReady){
   if( ready ){
       recipeDM.getRecipe(db, userID, recipeID, function(recipe) {
          cb(recipe);
       });
   } else {
      notReady(true);
   }
};

module.exports = {
   getRecipes: getRecipes,
   getRecipe: getRecipe
};
