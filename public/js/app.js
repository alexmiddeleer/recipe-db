var recipeApp = angular.module('recipe-db', [
   'ngRoute',
   'recipeControllers'
   ]);

recipeApp.config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
         when('/recipes', {
            templateUrl: '/ng-views/recipe-list',
            controller: 'recipe-list-ctrl'
         }).
        when('/recipe/:recipeId', {
           templateUrl: '/ng-views/recipe',
           controller: 'recipe-ctrl'
        }).
        when('/new-recipe', {
           templateUrl: '/ng-views/new-recipe',
           controller: 'new-recipe-ctrl'
        }).
        otherwise({
           redirectTo: '/recipes'
        });
}]);
