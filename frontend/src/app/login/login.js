import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './login.component';
import OauthService from '../../common/services/oauth';

const module = angular.module('login', [
        uirouter,
        OauthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.login', {
            url: 'login',
            template: '<login></login>',
            authenticated: 'none'
        })
    })
    .component('login', component)
export default module.name