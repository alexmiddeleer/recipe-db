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
   var stepsQuery = 'SELECT name, text as stepText ' +
      ' FROM recipe, instruction'+
      ' WHERE recipe.recipeID = instruction.recipeID' +
      ' AND recipe.userID = ' + userID + 
      ' AND recipe.recipeID = ' + recipeID
   ;
   var ingredQuery = 'SELECT name' +
      ' FROM food, ingredient'+
      ' WHERE ingredient.foodID = food.foodID' +
      ' AND ingredient.userID = ' + userID + 
      ' AND ingredient.recipeID = ' + recipeID
   ;

   var prettify = function(stepRows, ingredRows) {
      var result = {
        name:"noname",
        steps:[],
        ingredients:[]
      };

      var rows = stepRows;
      for (i in rows) {
         (i == 0) && ( result.name = rows[i].name );
         result.steps.push(rows[i].stepText);
      };
      
      rows = ingredRows;
      for (i in rows) {
         result.ingredients.push({
            'name': rows[i].name
         });
      };
      
      cb(result);
   };

   db.serialize( function () {
      steps = [];
      db.all( stepsQuery
         , function getRows(err, rows){
            err && eventEmitter.emit('error',err);
            steps = rows;
         }
      );
      db.all( ingredQuery
         , function getRows(err, ingredients){
            err && eventEmitter.emit('error',err);
            prettify(steps, ingredients);
         }
      );
   });
};

module.exports = {
   getRecipes: getRecipes
   , getRecipe: getRecipe
}
