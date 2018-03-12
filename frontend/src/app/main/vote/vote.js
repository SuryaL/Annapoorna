import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import OauthService from 'common/services/oauth';

const module = angular.module('vote', [
        uirouter,
        OauthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.main.vote', {
            url: 'vote',
            template: '<vote></vote>',
            authenticated: 'none'
        })
    })
    .component('vote', component)
export default module.name