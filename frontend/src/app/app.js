import angular from 'angular';
import uirouter from 'angular-ui-router';
// app
import controller from './app.controller';
import template from './app.html';
import './app.scss';

import colpick from 'common/components/colpick/colpick';

// modules
import home from './home/home'
import login from './login/login'

const app = angular.module('annapoorna', [uirouter, home,login])

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    // $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.otherwise('/login');
    
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