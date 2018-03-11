import angular from 'angular';
import uirouter from 'angular-ui-router';
// app
import controller from './app.controller';
import template from './app.html';
import './app.scss';

// modules
import home from './home/home'
const app = angular.module('letschat', [uirouter, home])

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/home');
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