'use strict';

angular.module('myApp.userprofile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userprofile', {
    templateUrl: 'userprofile/userprofile.html',
    controller: 'UserprofileCtrl',
    name : "Profil utilisateur"
  });
}])

.controller('UserprofileCtrl', [ '$rootScope', '$scope', '$location', '$firebaseArray', '$firebase', '$firebaseObject', '$http', '$routeParams', function($rootScope, $scope, $location, $firebaseArray, $firebase, $firebaseObject, $http, $routeParams) {
  $rootScope.hideit = false;

  firebase.auth().onAuthStateChanged(function(user) {
    $scope.userEmail = user.email;
    $scope.userName = "Sébastien Lapaire";
    $scope.userID = user.uid;

  });

  $scope.deleteAccount = function(){
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
      $rootScope.$apply(function() {
        $location.path("/login");
      });
    }, function(error) {
      alert(error);
    });
  }

}]);
