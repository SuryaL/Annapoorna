import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './menuIcon.component';

const module = angular.module('menuIcon', [
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
    .component('menuIcon', component)
export default module.name