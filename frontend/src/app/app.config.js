// app //
import controller from './app.controller';
import template from './app.html';
import './app.scss';

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