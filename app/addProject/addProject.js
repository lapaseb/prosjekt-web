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
  $('.datepicker').pickadate({
     selectMonths: true, // Creates a dropdown to control month
     selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $scope.addProject = function(e){
     e.preventDefault();
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           // On stock les valeurs fournies dans le formulaire
           var nomProjet         = $scope.project.name;
           var descriptionProjet = $scope.project.description;
           var projetAuthor      = user.uid;
           var dateDebut         = $scope.project.dateDebut;
           var dateFin           = $scope.project.dateFin;
           var importance        = $scope.project.importance;
           var progression       = $scope.project.progression;

           if (importance == 3){
             importance = "élevée";
           } else if (importance == 2){
             importance = "moyenne";
           } else if (importance == 1){
             importance = "faible";
           }

           console.log(dateDebut + " "  + dateFin + "  " + importance);


           firebase.database().ref(projetAuthor + '/projets').push({
              projetDescription: descriptionProjet,
              projetNom: nomProjet,
              /*
              dateDebut : dateDebut,
              dateFinPrevue : dateFin,*/
              importance : importance,
              progression : progression
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
