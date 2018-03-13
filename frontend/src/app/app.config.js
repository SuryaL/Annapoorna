import './app.scss';
import controller from './app.controller';
import template from './app.html';

export default function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
    'ngInject';

    // $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.otherwise('/vote');
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('OauthInterceptor');

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        template,
        controller,
        controllerAs: 'self'
    })
}