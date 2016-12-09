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
  'myApp.addTodo',
  'myApp.addSubTodo',
  'firebase'
]).run([
  '$rootScope', '$location', '$firebase', '$firebaseArray',
  function ($rootScope, $location, $firebase, $firebaseArray) {



      $rootScope.$on('$routeChangeStart', function (event, next) {
          $rootScope.currentRoute = next;
      });

      $rootScope.currentProject = null;

      firebase.auth().onAuthStateChanged(function(user) {
        $rootScope.userEmail = user.email;
        var ref = firebase.database().ref().child(user.uid + "/projets");
        $rootScope.projects = $firebaseArray(ref);
        console.log($rootScope.projects);
      });


      $rootScope.SignOut = function(e) {
        firebase.auth().signOut().then(function() {
          $rootScope.$apply(function() {
            $location.path("/login");
          });
        }, function(error) {
        });
      }

  }]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
   $routeProvider.otherwise({redirectTo: '/login'});
}]);
