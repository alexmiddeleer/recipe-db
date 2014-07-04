var eventEmitter = new (require('events')).EventEmitter()
//   , d2 = blah
;

getRecipes = function(db, userID, cb){
   var recipes = []
   , recipeQuery = 'SELECT name AS name FROM recipe'+
      ' WHERE userID = ' + userID + ';'
   ;

   db.serialize( function () {
      db.each( recipeQuery
         , function processRow(err, row){
            err && eventEmitter.emit('error',err);
            recipes.push(row.name);
         }
         , function done() {
            cb(recipes);
         }
      );
   });
};

module.exports = {
   getRecipes: getRecipes
}
