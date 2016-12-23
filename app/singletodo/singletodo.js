'use strict';

angular.module('myApp.singletodo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/singletodo', {
    templateUrl: 'singletodo/singletodo.html',
    controller: 'SingleTodoCtrl',
    name : "Votre tâche"
  });
}])

.controller('SingleTodoCtrl', [ '$rootScope', '$scope', '$location', '$firebaseArray', '$firebase', '$firebaseObject', '$http', '$routeParams', function($rootScope, $scope, $location, $firebaseArray, $firebase, $firebaseObject, $http, $routeParams) {
  $rootScope.hideit = false;

  firebase.auth().onAuthStateChanged(function(user) {

    var refTodo = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/" + $routeParams.todoID);
    $scope.singleTodo = $firebaseObject(refTodo);

    $scope.deleteTodo = function(){
      refTodo.remove();
      $location.path("#/todo?projectID=" + $routeParams.projectID);
    }

  });

}]);
