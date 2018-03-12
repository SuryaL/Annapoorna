import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import OauthService from '../../common/services/oauth';
import AuthService from '../../common/services/auth';


const module = angular.module('main', [
        uirouter,
        OauthService,
        AuthService
    ])

    .config(function($stateProvider, $httpProvider) {
        'ngInject';
        $httpProvider.interceptors.push('OauthInterceptor');
        $stateProvider.state('app.main', {
            url: 'main',
            template: '<main></main>',
            authenticated: 'none'
        })
    })
    .component('main', component)
export default module.name