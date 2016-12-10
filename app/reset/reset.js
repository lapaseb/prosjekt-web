'use strict';

angular.module('myApp.reset',  ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reset', {
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

  $scope.resetPassword = function(){
    var email    = $scope.user.email;
    var auth     = firebase.auth();

    if (email == null){
      Materialize.toast("indiquez votre adresse email dans le champ prévu à cet effet.", 4000);
    } else {
      auth.sendPasswordResetEmail(email).then(function() {
        Materialize.toast("Un email de réinitialiser vous a été envoyé à l\'adresse " + email, 4000);
        $rootScope.$apply(function() {
          $location.path("/login");
        });
      }, function(error) {
        Materialize.toast("Une erreur s'est produite.", 4000);
      });
    }
  }

}]);
