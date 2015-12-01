'use strict';

angular.module('conversationsApp')
.controller('loginCtrl', function($scope, $auth) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err){
      console.error(err);
    });
  };

});
