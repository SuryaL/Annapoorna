import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import AuthService from 'common/services/auth';
import vote from './vote/vote';
import TabsService from 'common/services/tabs';


const module = angular.module('main', [
        uirouter,
        AuthService,
        vote,
        TabsService
    ])

    .config(function($stateProvider) {
        'ngInject';
        $stateProvider.state('app.main', {
            // url: 'main',
            abstract:true,
            template: '<main></main>',
            authenticated: 'authenticated'
        })
    })
    .component('main', component)
export default module.name