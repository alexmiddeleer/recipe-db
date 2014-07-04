var eventEmitter = new (require('events')).EventEmitter()
//   , d2 = blah
;

getRecipes = function(db, userID, cb){
   var recipes = []
   , recipeQuery = 'SELECT recipeID AS id, name FROM recipe'+
      ' WHERE userID = ' + userID + ';'
   ;

   db.serialize( function () {
      db.each( recipeQuery
         , function processRow(err, row){
            err && eventEmitter.emit('error',err);
            recipes.push(row);
         }
         , function done() {
            cb(recipes);
         }
      );
   });
};

getRecipe = function(db, userID, recipeID, cb){
   var recipeQuery = 'SELECT name  FROM recipe'+
      ' WHERE userID = ' + userID + 
      ' AND recipeID = ' + recipeID
   ;

   db.serialize( function () {
      db.get( recipeQuery
         , function processRow(err, row){
            err && eventEmitter.emit('error',err);
            cb(row);
         }
      );
   });
};

module.exports = {
   getRecipes: getRecipes
   , getRecipe: getRecipe
}
