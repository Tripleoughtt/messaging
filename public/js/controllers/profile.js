'use strict';

angular.module('conversationsApp')
.controller('profileCtrl', function($scope, $auth, $state, $http) {
  if(!$auth.isAuthenticated()){
    return $state.go('home');
  }

  $http.get('/users/me')
  .then(function(res) {
    $scope.user = res.data;
    console.log('res:', res);
  }, function(err) {
    console.error(err);
  });
});
