'use strict';

angular.module('myApp.todo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todo', {
    templateUrl: 'todo/todo.html',
    controller: 'TodoCtrl',
    name : "Tâches à réaliser"
  });
}])

.controller('TodoCtrl', [ '$rootScope', '$scope', '$location', '$firebaseArray', '$firebase', '$firebaseObject', '$http', '$routeParams', function($rootScope, $scope, $location, $firebaseArray, $firebase, $firebaseObject, $http, $routeParams) {
  $rootScope.hideit = false;


  firebase.auth().onAuthStateChanged(function(user) {
    var ref = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID);
    $scope.singleProject = $firebaseObject(ref);
  });



}]);
