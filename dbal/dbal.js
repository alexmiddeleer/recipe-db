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
       err && eventEmitter.emit('error', errNotRdy);
       ready=true;
   }
);

function checkDBThen (cb) {
   if( ready ){
      cb();
   } else {
      eventEmitter.emit('error', errNotRdy);
   }
}

function getRecipes(userID, cb){
   checkDBThen(function() {
      recipeDM.getRecipes(db, userID, cb);
   });
};

function getRecipe(userID, recipeID, cb){
   checkDBThen(function() {
      recipeDM.getRecipe(db, userID, recipeID, cb);
   });
}

function newRecipe (data, cb) {
   checkDBThen( function() {
      recipeDM.newRecipe(db, data, cb);
  });
}

module.exports = {
   getRecipes: getRecipes
   , getRecipe: getRecipe
   , newRecipe: newRecipe
};
