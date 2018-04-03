import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './userBalance.component';
import PaymentService from 'common/services/payment';
import AuthService from 'common/services/auth';

const module = angular.module('userBalance', [
        AuthService,
        uirouter,
        PaymentService
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