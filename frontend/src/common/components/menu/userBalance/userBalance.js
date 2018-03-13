import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './footerBtn.component';

const module = angular.module('footerBtn', [
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
    .component('footerBtn', component)
export default module.name