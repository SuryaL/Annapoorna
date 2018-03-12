import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import OauthService from 'common/services/oauth';
import AuthService from 'common/services/auth';
import vote from './vote/vote';

const module = angular.module('main', [
        uirouter,
        OauthService,
        AuthService,
        vote
    ])

    .config(function($stateProvider, $httpProvider) {
        'ngInject';
        $httpProvider.interceptors.push('OauthInterceptor');
        $stateProvider.state('app.main', {
            // url: 'main',
            abstract:true,
            template: '<main></main>',
            authenticated: 'none'
        })
    })
    .component('main', component)
export default module.name