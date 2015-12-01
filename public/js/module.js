'use strict';

let app = angular.module('conversationsApp', ['satellizer', 'ui.router']);

var socket = io();


app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', { url: '/', templateUrl: 'partials/home.html', controller: 'homeCtrl'})
    .state('login', { url: '/login', templateUrl: 'partials/login.html', controller: 'loginCtrl'})
    .state('people', {url: '/people', templateUrl: 'partials/people.html', controller: 'peopleCtrl'})
    .state('conversations', {url: '/conversations', templateUrl: 'partials/conversations.html', controller: 'conversationsCtrl'})
    .state('profile', { url: '/profile', templateUrl: 'partials/profile.html', controller: 'profileCtrl'})

    $authProvider.github({
      clientId: 'dc7ce78bb37c581bc816'
    });
    $authProvider.google({
      clientId: '526149733092-f7niddi911rv2au66qcnse0cd5r4hql5.apps.googleusercontent.com'
    });

});
