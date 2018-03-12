import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './footerBtn.component';
import OauthService from 'common/services/oauth';

const module = angular.module('footerBtn', [
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
    .component('footerBtn', component)
export default module.name