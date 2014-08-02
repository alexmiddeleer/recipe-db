var recipeControllers = angular.module('recipeControllers',[]);

recipeControllers.controller('recipe-list-ctrl', function ($scope, $http) {
  $scope.title="recipeDB";
  $http.get('/data/recipes').success(function(data) {
    $scope.recipes = data;
  });
});

// Controller for single recipe view
recipeControllers.controller('recipe-ctrl', function ($scope, $http, $routeParams, $location) {
   $http.get('/data/recipe/'+$routeParams.recipeId)
      .success(function(data) {
         $scope.ingredients = data.ingredients;
         $scope.title = data.name;
         $scope.steps = data.steps;
   });
   if ($location.search()['new']) {
      $scope.message='Recipe added!'; 
   }
});

// Controller for new recipe view
recipeControllers.controller('new-recipe-ctrl', function ($scope, $http, $location) {
   var instrIndex=0, ingrIndex=0;
   $scope.recipe = $scope.recipe || {};
   $scope.recipe.instructions     = [{index: 0}];
   $scope.recipe.ingredients      = [{index: 0}];
   $scope.recipe.categories       = [{}];

   $scope.addInstr = function() {
      $scope.recipe.instructions.push({index:++instrIndex});
    };

   $scope.addIngr = function() {
      $scope.recipe.ingredients.push({index:++ingrIndex});
   };

   $scope.addCateg = function() {
      $scope.recipe.categories.push({});
   };

   $scope.instrViewDetail = function(instr) {
      //todo provide detail view
   };

   var onSuccess = function(data) {
      var recipeID = data.recipeID;
      $location.path('/recipe/'+recipeID);
      $location.search('new');
   };
   var onErr = function(data) {
      console.error('the recipe creation reported an error');
   };

   $scope.submitNewRecipe = function() {

      $http.post('/data/new-recipe/', $scope.recipe).
         success(function(data, status, headers, config) {
            console.log(data);
            if (data.success) {
               onSuccess(data.data)
            } else {
               onErr(data);
            }
         }).
         error(function(data, status, headers, config) {
         });
   };
});
