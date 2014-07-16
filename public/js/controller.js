var recipeControllers = angular.module('recipeControllers',[]);

recipeControllers.controller('recipe-list-ctrl', function ($scope, $http) {
  $scope.title="recipeDB";
  $http.get('/data/recipes').success(function(data) {
    $scope.recipes = data;
  });
});

// Controller for single recipe view
recipeControllers.controller('recipe-ctrl', function ($scope, $http, $routeParams) {
  $http.get('/data/recipe/'+$routeParams.recipeId).success(function(data) {
    $scope.ingredients = data.ingredients;
    $scope.title = data.name;
    $scope.steps = data.steps;
  });
});

// Controller for new recipe view
recipeControllers.controller('new-recipe-ctrl', function ($scope, $http) {
   $scope.instructions = [{}];
   $scope.ingredients = [{}];
   $scope.categories = [{}];

   $scope.addInstr = function() {
      $scope.instructions.push({});
   };

   $scope.addIngr = function() {
      $scope.ingredients.push({});
   };

   $scope.addCateg = function() {
      $scope.categories.push({});
   };

   $scope.instrViewDetail = function(instr) {
      //todo provide detail view
   };
});

//   var instrIndex=0, ingrIndex=0, categIndex=0;
//   $scope.instructions = [{index:instrIndex}];
//   $scope.ingredients = [{index:ingrIndex}];
//   $scope.categories = [{index:categIndex}];
//
//   $scope.addInstr = function() {
//      $scope.instructions.push({index:instrIndex++});
//   };
//
//   $scope.addIngr = function() {
//      $scope.ingredients.push({index:ingrIndex++});
//   };
//
//   $scope.addCateg = function() {
//      $scope.categories.push({index:categIndex++});
//   };
