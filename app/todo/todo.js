'use strict';

angular.module('myApp.todo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todo', {
    templateUrl: 'todo/todo.html',
    controller: 'TodoCtrl',
    name : "Tâches à réaliser"
  });
}])

.controller('TodoCtrl', [ '$rootScope', '$scope', '$location', '$firebaseArray', '$firebase', function($rootScope, $scope, $location, $firebaseArray, $firebase) {
  $rootScope.hideit = false;

}]);
