'use strict';

angular.module('myApp.addProject',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addProject', {
    templateUrl: 'addProject/addProject.html',
    controller: 'AddProjectCtrl',
    name : 'Ajouter un projet'
  });
}])

.controller('AddProjectCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
  $rootScope.hideit = false;

  $scope.addProject = function(e){
     e.preventDefault();
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           // On stock les valeurs fournies dans le formulaire
           var nomProjet    = $scope.project.name;
           var descriptionProjet    = $scope.project.description;
           var projetAuthor = user.uid;

           firebase.database().ref(projetAuthor + '/projets').push({
              projetDescription: descriptionProjet,
              projetNom: nomProjet
            }).then(function(ref) {
                window.location.href = "#/projects";
            }, function(error) {
                alert(error);
            });

        } else {
          alert('erreur');
        }
      })
 };
}]);
