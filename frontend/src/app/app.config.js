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