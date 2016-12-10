'use strict';

angular.module('myApp.reset',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'reset/reset.html',
    controller: 'ResetCtrl'
  });
}])

.controller('ResetCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
  $rootScope.hideit = true;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      $rootScope.$apply(function() {
        $location.path("/projects");
      });
    }
  });


  $scope.SignIn = function(e){
     e.preventDefault();
     // On stock les valeurs fournies dans le formulaire de connexion
     var email    = $scope.user.email;
     var password = $scope.user.password;

     firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
       $rootScope.$apply(function() {
         $location.path("/projects");
       });
      }, function(error){
          // On affiche les erreurs si la connexion a échouée
          $scope.regError = true;
          $scope.regErrorMessage = error.message;
          alert($scope.regErrorMessage);
      });
  }

  $scope.signInGoogle = function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(error);
    });
  }

  $scope.resetPassword = function(){
    var email    = $scope.user.email;
    var auth = firebase.auth();

    if (email == null){
      Materialize.toast("indiquez votre adresse email dans le champ prévu à cet effet.", 4000);
    } else {
      auth.sendPasswordResetEmail(email).then(function() {
        Materialize.toast("Un email de réinitialiser vous a été envoyé à l\'adresse " + email, 4000);
      }, function(error) {
        Materialize.toast("Une erreur s'est produite.", 4000);
      });
    }




  }

}]);
