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

  $scope.SignIn = function(e){
     e.preventDefault();
     // On stock les valeurs fournies dans le formulaire de connexion
     var email    = $scope.user.email;
     var password = $scope.user.password;
     firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
          $location.path("#!/view1");
      }, function(error){
          // On affiche les erreurs si la connexion a échouée
          $scope.regError = true;
          $scope.regErrorMessage = error.message;
          alert($scope.regErrorMessage);
      });
  }

}]);
