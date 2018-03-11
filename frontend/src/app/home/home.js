import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './home.component';
import OauthService from '../../common/services/oauth';

const module = angular.module('home', [
        uirouter,
        OauthService
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