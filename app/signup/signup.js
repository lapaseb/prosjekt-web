'use strict';

angular.module('myApp.signup',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
  $rootScope.hideit = true;

  $scope.SignUp = function(e){
     e.preventDefault();
     // On stock les valeurs fournies dans le formulaire de connexion
     var email    = $scope.user.email;
     var password = $scope.user.password;
     var passwordrepeat = $scope.user.passwordrepeat;

     firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
       $rootScope.$apply(function() {
         $location.path("/projects");
       });
     }, function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
     });
  }

}]);
