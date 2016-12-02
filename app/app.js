'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.projects',
  'myApp.todo',
  'myApp.version',
  'myApp.login',
  'myApp.signup',
  'myApp.addProject',
  'firebase'
]).run([
  '$rootScope', '$location',
  function ($rootScope, $location) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
          $rootScope.currentRoute = next;
      });

      firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.userEmail = user.email;
      });

      $rootScope.SignOut = function(e) {
        firebase.auth().signOut().then(function() {
          $rootScope.$apply(function() {
            $location.path("/login");
          });
        }, function(error) {
          alert(error);
        });
      }

  }]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
   $routeProvider.otherwise({redirectTo: '/login'});
}]);
