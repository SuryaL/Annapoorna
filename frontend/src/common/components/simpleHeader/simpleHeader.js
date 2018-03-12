import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './order_item.component';
import OauthService from 'common/services/oauth';

const module = angular.module('orderItem', [
        uirouter,
        OauthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        // $stateProvider.state('app.main.vote', {
        //     url: 'vote',
        //     template: '<vote></vote>',
        //     authenticated: 'none'
        // })
    })
    .component('orderItem', component)
export default module.name