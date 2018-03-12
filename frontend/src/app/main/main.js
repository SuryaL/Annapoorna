import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import OauthService from '../../common/services/oauth';

const module = angular.module('main', [
        uirouter,
        OauthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.main', {
            url: 'main',
            template: '<main></main>',
            authenticated: 'none'
        })
    })
    .component('main', component)
export default module.name