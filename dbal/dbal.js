var sqlite3 = require('sqlite3').verbose()
   , eventEmitter = new (require('events')).EventEmitter()
   , ready = false
   , db
   , dbName = 'recipes.db'
   , errNotRdy = 'The database failed to open'
;

db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY
, function(err) {
    err && eventEmitter.emit('error', dbNotReady);
    ready=true;
});

var recipeQuery = 'SELECT name AS name FROM recipe;'
function dbGetRecipes (userID, cb) {
   var recipes = [];
   db.serialize( function stuffToSerialize() {
      db.each(recipeQuery
         , function(err, row){
            err && eventEmitter.emit('error',err);
            recipes.push(row.name);
         }
         , function doneWithEachRow() {
            cb(recipes);
         }
      );
   });
}

function getRecipes(userID, cb, notReady){
   if(ready){
       dbGetRecipes(userID, function(recipes) {
          cb(recipes);
       });
   } else {
      notReady(true);
   }
};

module.exports = {
   getRecipes: getRecipes
};
