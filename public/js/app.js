'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'angularCharts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/workout', {templateUrl: 'partials/workout.html', controller: 'Workout'});
  $routeProvider.when('/progress', {templateUrl: 'partials/progress.html', controller: 'Progress'});
  $routeProvider.when('/measures', {templateUrl: 'partials/measures.html', controller: 'Measures'});
  $routeProvider.otherwise({redirectTo: '/workout'});
}]);
