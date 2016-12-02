'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl',
    name : "Mes projets"
  });
}])

.controller('ProjectsCtrl', [ '$rootScope', '$scope', '$location', function($rootScope) {
  $rootScope.hideit = false;
}]);
