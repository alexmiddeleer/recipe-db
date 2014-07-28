var eventEmitter = new (require('events')).EventEmitter()
   ,_ = require('underscore')
   ,sqlString = require('./sqlite/sqlite.js').sqlString
   ,valuesString = require('./sqlite/sqlite.js').valuesString
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

   q = q + valuesString(values);;
   // console.log('query: ' +  q);
   db.run(q, function(err) {
      if (err) {
         cb(err);
      } else {
         // console.log('lastID is ' + this.lastID);
         var recipeID = this.lastID;
         addIngredients(recipeID, data.ingredients, db, function(err) {
            //TODO
          });
         addInstructions(recipeID, data.instructions, db, function(err) {
            //TODO
          });
      } 
   });
}

function addIngredients (recipeID, ingredients, db, cb) {
   var foodNames = _.pluck(ingredients, 'name');
   // console.log('foodNames is :');
   // console.log(foodNames);
   var numToAdd = foodNames.length;
   var numAdded = 0;
   _.each(foodNames, function(name) {
      // console.log('foodname is ' + name);
      addIngredient(name, recipeID, db, function(err) {
         numAdded++;
         err && cb(err);
         if (numAdded==numToAdd) {
            cb();
         };
      });
   });
}

function addIngredient (foodName, recipeID, db, cb) {
   var afterAddFood = function(foodID) {
      var q = 'INSERT INTO ingredient' +
         '(userID, recipeID, foodID) VALUES ';
      var vals = [userID, recipeID, foodID];
      vals = valuesString(vals);
      q = q + vals;
      // console.log('q is ' + q);
      db.run(q, function(err) {
         if (err) {
            cb(err);
         } else {
            cb(); // 
         } 
      });
   };

   var q = 'INSERT INTO food' +
      '(userID, name) VALUES ';
   var vals = [userID];
   vals.push(sqlString(foodName));
   q = q + valuesString(vals);
   // console.log('q is ' + q);
   db.run(q, function(err) {
      if (err) {
         cb(err);
      } else {
         // console.log('food lastID is ' + this.lastID);
         var foodID = this.lastID;
         afterAddFood(foodID);
      } 
   });
}

function addInstructions (recipeID, instructions, db, cb) {
   var numToAdd = instructions.length;
   var numAdded = 0;
   _.each(instructions, function(instr) {
      // console.log('foodname is ' + name);
      addInstruction(recipeID, instr, db, function cbEach(err) {
         numAdded++;
         err && cb(err);
         if (numAdded==numToAdd) {
            cb();
         };
      });
   });
}

function addInstruction (recipeID, instruction, db, cb) {
   var q = 'INSERT INTO instruction' +
      '(userID, recipeID, text, stepNum) VALUES ';
   var vals = [
      userID,
      recipeID
      , sqlString(instruction.text)
      , instruction.index+1
   ];
   var q = q + valuesString(vals);
   console.log('q is ' + q);
   db.run(q, cb);
}

module.exports ={
   newRecipe: newRecipe
}
