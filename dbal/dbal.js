var dbms = require('./sqlite/sqlite.js')
   , ready = false
   , dbName = 'recipes.db'
   , errNotRdy = 'The database failed to open'
   , recipeDM = require('./recipe.js')
   , newRecipeDM = require('./newRecipe.js')
   , db
   , userID = 1 // TODO
;

db = dbms.init(dbName, function(err) {
   ready = (typeof err == 'undefined') || (err === null) || (err === false);
});

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
      newRecipeDM.newRecipe(db, userID, data, cb);
  });
}

module.exports = {
   getRecipes: getRecipes
   , getRecipe: getRecipe
   , newRecipe: newRecipe
};
