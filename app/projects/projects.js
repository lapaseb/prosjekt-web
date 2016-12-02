'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl',
    name : "Mes projets"
  });
}])

.controller('ProjectsCtrl', [ '$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
  $rootScope.hideit = false;

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      $location.path("#/login");
      Materialize.toast('Vous devez vous connecter pour accéder à cette page.', 4000);
    } else {
      $rootScope.userEmail = user.email;
    }
  });


}]);
