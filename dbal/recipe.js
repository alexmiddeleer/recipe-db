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
   var recipeQuery = 'SELECT name, text as stepText ' +
      ' FROM recipe, instruction'+
      ' WHERE recipe.recipeID = instruction.recipeID' +
      ' AND recipe.userID = ' + userID + 
      ' AND recipe.recipeID = ' + recipeID
   ;

   var prettify = function(rows) {
      var result = {
        name:"noname",
        steps:[]
      };

      for (var i = 0; i < rows.length; i++) {
         result.name = rows[i].name;
         result.steps.push(rows[i].stepText);
      };
      
      cb(result);
   };

   db.serialize( function () {
      db.all( recipeQuery
         , function getRows(err, rows){
            err && eventEmitter.emit('error',err);
            prettify(rows);
         }
      );
   });
};

module.exports = {
   getRecipes: getRecipes
   , getRecipe: getRecipe
}
