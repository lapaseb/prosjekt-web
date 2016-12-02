'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl',
    name : "Mes projets"
  });
}])

.controller('ProjectsCtrl', [ '$rootScope', '$scope', '$location', '$firebaseArray', '$firebase', '$firebaseObject', function($rootScope, $scope, $location, $firebaseArray, $firebase, $firebaseObject) {
  $rootScope.hideit = false;

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      $location.path("#/login");
      Materialize.toast('Vous devez vous connecter pour accéder à cette page.', 4000);
    } else {
      $rootScope.userEmail = user.email;
      var ref = firebase.database().ref().child(user.uid + "/projets");
      $scope.articles = $firebaseArray(ref);
      // Fonction permettant de récupérer la valeur d'un projet à partir de son ID
      $rootScope.singleProject = function(id){
        // On créé la référence à la base de donnée en ajoutant l'id
        var ref = firebase.database().ref().child(user.uid + "/projets/" + id);

        $rootScope.singleProject = $firebaseObject(ref);

        $location.path("/todo").replace();
      }

    }
  });

  $rootScope.addProjectPage = function() {
    $location.path("/addProject");
  }



}]);
