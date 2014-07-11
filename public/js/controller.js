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
