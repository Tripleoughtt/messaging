
'use strict';

var socket = io()
angular.module('conversationsApp')
.controller('conversationsCtrl', function($scope, $auth, $state, $http) {
  if(!$auth.isAuthenticated()){
    return $state.go('home');
  }

  $scope.sendMessage = function( conversation){
    var user = localStorage.getItem('satellizer_token')
    console.log(user)
    var data = {user: user, conversation: conversation }
    socket.emit('newMessage', data)

  }
  socket.on('conversations', function(convos){
    $scope.conversations = convos
  })
  $http.get('/conversations')
  .then(function(res) {
    $scope.conversations = res.data;
    console.log('res:', res);
  }, function(err) {
    console.error(err);
  });
});
