import './app.scss';
import controller from './app.controller';
import template from './app.html';

export default function($stateProvider, $locationProvider, $urlRouterProvider) {
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
}