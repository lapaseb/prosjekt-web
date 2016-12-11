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

  $scope.addTodo = function(){
    $location.path("/addTodo");
  }



  $scope.addSubTodo = function(currentID){
    $rootScope.TodoID = currentID;
    $location.path("/addSubTodo");
  }



  firebase.auth().onAuthStateChanged(function(user) {
    var ref = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID);
    $rootScope.currentProject = $routeParams.projectID;
    console.log(ref);
    $scope.singleProject = $firebaseObject(ref);

    var refTodo = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/");
    $scope.MainTodos = $firebaseArray(refTodo);


  });

}]);
