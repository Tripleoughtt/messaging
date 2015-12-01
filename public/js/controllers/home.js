'use strict';
angular.module('conversationsApp')
.controller('homeCtrl', function($scope, $auth) {
  $scope.sendMessage = function(){
    socket.emit('message', "Here's a message!")
  }

});
