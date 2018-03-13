import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './checkbox.component';

const module = angular.module('checkbox', [
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
    .component('checkbox', component)
export default module.name