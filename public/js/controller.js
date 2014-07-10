var app = angular.module('recipe-db', []);

app.controller('recipe-ctrl', function ($scope, $http) {
  $http.get('/data/recipes').success(function(data) {
    $scope.recipes = data;
  });
});
