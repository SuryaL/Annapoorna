import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './userBalance.component';

const module = angular.module('userBalance', [
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
    .component('userBalance', component)
export default module.name