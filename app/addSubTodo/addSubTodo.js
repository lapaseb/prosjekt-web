'use strict';

angular.module('myApp.addSubTodo',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addSubTodo', {
    templateUrl: 'addSubTodo/addSubTodo.html',
    controller: 'addSubTodoCtrl',
    name : 'Ajouter une tâche interne'
  });
}])

.controller('addSubTodoCtrl', ['$rootScope', '$scope', '$location', '$routeParams', function($rootScope, $scope, $location, $routeParams) {
  $rootScope.hideit = false;

  $scope.addSubTodo = function(e){
     e.preventDefault();
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           // On stock les valeurs fournies dans le formulaire
           var nomTodo           = $scope.project.name;
           var descriptionTodo   = $scope.project.description;
           var todoAuthor        = user.uid;
           var dateDebut         = $scope.project.dateDebut;
           var dateFin           = $scope.project.dateFin;
           var progression       = $scope.project.progression;

           var dateDeDebut = new moment(dateDebut).format('Do MMMM YYYY');
           var dateDeFinPrevue = new moment(dateFin).format('Do MMMM YYYY');

           if($rootScope.currentProject == null){
             alert("Veuillez sélectionner un projet.");
           } else {
             firebase.database().ref(todoAuthor + '/projets/' + $rootScope.currentProject  + "/tachesPrincipales/"  + $rootScope.TodoID + "/tachesSecondaire/").push({
                descriptionTacheSecondaire: descriptionTodo,
                nomTacheSecondaire: nomTodo,
                progression: progression,
                dateDebut: dateDeDebut,
                dateFinPrevue: dateDeFinPrevue
              }).then(function(ref) {
                  window.location.href = "#/todo?projectID=" + $routeParams.projectID;
              }, function(error) {
                  alert(error);
              });
           }
        } else {
          alert('erreur');
        }
      })
 };
}]);
