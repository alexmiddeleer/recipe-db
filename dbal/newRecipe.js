var eventEmitter = new (require('events')).EventEmitter()
   ,_ = require('underscore')
   ,sqlString = require('./sqlite/sqlite.js').sqlString
   ,userID=1 //TODO
;

function newRecipe (db, userID, data, cb) {
   var q = 'INSERT INTO recipe ' +
      '(userID, name, source, author, serves, cookTimeHours, cookTimeMinutes, notes, categories) VALUES ';
   var values = [
      userID,
      sqlString(data.name),
      sqlString(data.source),
      sqlString(data.author),
      data.serves,
      data.cookTimeHrs,
      data.cookTimeMins,
      sqlString('todo')
   ];
   var categories = _.pluck(data.categories, 'name');
   categoriesStr = sqlString(categories.join(','));
   values.push(categoriesStr);

   valuesStr='('+values.join(',') + ')';
   q = q + valuesStr;
   console.log('query: ' +  q);
   db.run(q, function(err) {
      if (err) {
         cb(err);
      } else {
         var recipeID = this.lastID;
         addIngredients(recipeID, data.ingredients);
         addIngredients(recipeID, data.instructions);
      } 
   });
}

function addIngredients (recipeID, ingredients) {
   // var foodNames = _.pluck(ingredients, 'name');
   // var q = 'INSERT INTO food' +
   //    '(userID, name) VALUES ';
   // var values = [
   //    userID,

}

function addInstructions (recipeID, instructions) {
   // body...
}

module.exports ={
   newRecipe: newRecipe
}
