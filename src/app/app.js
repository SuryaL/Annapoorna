import angular from 'angular';
import uirouter from 'angular-ui-router';
// app
import controller from './app.controller';
import template from './app.html';
import './app.scss';

// modules
import chat from './chat/chat'
// import room from './room/room'

import registerModule from './register/register';
import loginModule from './register/login/login';
import signupModule from './register/signup/signup';
import loadModule from './register/load/load';

const app = angular.module('letschat', [uirouter, chat, registerModule, loginModule, signupModule, loadModule])

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/register/login');
    $locationProvider.hashPrefix('');

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        template,
        controller,
        controllerAs: 'self'
    })
})

app.run(function($state, $rootScope, $window) {
    'ngInject';
    // $state.go( 'app.home' )
    $rootScope.baseURL = "http://localhost:3001";
    $rootScope.setUser = function(userInfo) {
        $window.localStorage.setItem('user', JSON.stringify(userInfo));
    };
    $rootScope.getUser = function() {
        let user = $window.localStorage.getItem('user') || '{}';
        return $rootScope.user = JSON.parse(user);
    }
    $rootScope.getUser();
})

export default app.name;