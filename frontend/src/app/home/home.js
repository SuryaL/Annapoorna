import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './home.component';
import OauthService from '../../common/services/oauth';
import AuthService from '../../common/services/auth';

const module = angular.module('home', [
        uirouter,
        OauthService,
        AuthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.home', {
            url: 'home',
            template: '<home></home>',
            authenticated: 'none'
        })
    })
    .component('home', component)
export default module.name