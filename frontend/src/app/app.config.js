import './app.scss';
import controller from './app.controller';
import template from './app.html';

export default function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, inputPlaceholderProvider) {
    'ngInject';

    // $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.otherwise('/vote');
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('OauthInterceptor');

    inputPlaceholderProvider.setSwitchOnFocus(true); // toggle the switch on focus or on when input has a value
    inputPlaceholderProvider.setTransUpRatio({x:0.1, y:1});
    inputPlaceholderProvider.setTransDownRatio({x:0.4});
    inputPlaceholderProvider.setAnimationTime(0.2);
    inputPlaceholderProvider.setAnimationScale(0.9) // default
    inputPlaceholderProvider.setAnimationTime(0.3) // in seconds


    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        template,
        controller,
        controllerAs: 'self'
    })
}