var validator = require('tv4')
   , schema = require('./schemas/new-recipe.json') 
   , sanitizer = require('validator') 
;

var filter = function(params) {
   var result = v.validate(schema, params);
//   filter.fillStrings(result, ['name', 'source', 'author']);
//   filter.fillInts(result, ['serves','cookTimeHrs', 'cookTimeMins']);
   
   return result;
}


module.exports = {
   filter: filter
};
