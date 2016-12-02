'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.projects',
  'myApp.todo',
  'myApp.version',
  'myApp.login'
]).run([
  '$rootScope',
  function ($rootScope) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
          $rootScope.currentRoute = next;
      });
  }]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/projects'});
}]);
