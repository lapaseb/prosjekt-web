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

    var refTodo = firebase.database().ref().child(user.uid + "/projets/" + $rootScope.currentProject + "/tachesPrincipales/" + $routeParams.todoID);
    $scope.singleTodo = $firebaseObject(refTodo);
    console.log($scope.singleTodo);

    $scope.deleteTodo = function(){
      refTodo.remove();
      $location.path("#/todo?projectID=" + $rootScope.currentProject);
    }

  });

}]);
