'use strict';

angular.module('myApp.login',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
  $rootScope.hideit = true;


}]);
