import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './simpleHeader.component';

const module = angular.module('simpleHeader', [
        uirouter,
    ])

    .config(function($stateProvider) {
        'ngInject';

        // $stateProvider.state('app.main.vote', {
        //     url: 'vote',
        //     template: '<vote></vote>',
        //     authenticated: 'none'
        // })
    })
    .component('simpleHeader', component)
export default module.name