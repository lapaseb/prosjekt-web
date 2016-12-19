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



    $scope.setTodoState = function(todoID, subTodoID){

      var SubTodos = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/" +  todoID + "/tachesSecondaire/");
      var SubTodosArray = $firebaseArray(SubTodos);
      var nbreTodoOver = 0;

      SubTodosArray.$loaded().then(function(){

        for (var i = 0; i < SubTodosArray.length ; i++){
          if (SubTodosArray.$getRecord(SubTodosArray.$keyAt(i)).isOver == true){
            nbreTodoOver++;
          }
        }

        var refProgression = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/" +  todoID + "/progression/");
        var refProgressionToShow = $firebaseObject(refProgression);



        var onValueChange = refProgression.once('value', function(dataSnapshot) {
        });

        var ref = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/" +  todoID + "/tachesSecondaire/" + subTodoID + "/isOver/");
        var isOver = $firebaseObject(ref);

        var onValueChange = ref.once('value', function(dataSnapshot) {

          refProgressionToShow.$loaded().then(function(){
            if (dataSnapshot.val() == false){
              nbreTodoOver++;
              ref.set(true);
              refProgression.set(refProgressionToShow.$value + (100/SubTodosArray.length));
            }else {
              nbreTodoOver--;
              ref.set(false);
              refProgression.set(refProgressionToShow.$value - (100/SubTodosArray.length));
            }

          })
        });

      })




    }

    var ref = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID);
    $rootScope.currentProject = $routeParams.projectID;
    $scope.singleProject = $firebaseObject(ref);

    var refTodo = firebase.database().ref().child(user.uid + "/projets/" + $routeParams.projectID + "/tachesPrincipales/");
    $scope.MainTodos = $firebaseArray(refTodo);

  });

}]);
