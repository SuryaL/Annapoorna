import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './menuBar.component';
import UserService from 'common/services/user';
import TabsService from 'common/services/tabs';


const module = angular.module('menuBar', [
        uirouter,
        UserService,
        TabsService
    ])

    .config(function($stateProvider) {
        'ngInject';

        // $stateProvider.state('app.main.vote', {
        //     url: 'vote',
        //     template: '<vote></vote>',
        //     authenticated: 'none'
        // })
    })
    .component('menuBar', component)
export default module.name