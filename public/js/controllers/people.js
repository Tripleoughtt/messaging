angular.module('conversationsApp')
.controller('peopleCtrl', function($scope, $http, $auth, $state){
  
  if(!$auth.isAuthenticated()){
    return $state.go('home');
  }
  $scope.startConversation = function(user){
    $http.post('/conversations', {userTwo: user}).then(function(res){
      console.log(res)
      return $state.go('conversations')
    });
  }
  $http.get('/people')
  .then(function(res) {
    $scope.users = res.data;
    console.log('res:', res);
  }, function(err) {
    console.error(err);
  });
})
