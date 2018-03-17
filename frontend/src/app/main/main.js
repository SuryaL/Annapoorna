import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import AuthService from 'common/services/auth';
import TabsService from 'common/services/tabs';

import vote from './vote/vote';
import order from './order/order';
import history from './history/history';
import users from './users/users';
import profile from './profile/profile';

const module = angular.module('main', [
        uirouter,
        AuthService,
        vote,
        order,
        history,
        users,
        profile,
        TabsService
    ])

    .config(function($stateProvider) {
        'ngInject';
        $stateProvider.state('app.main', {
            // url: 'main',
            abstract: true,
            template: '<main></main>',
            authenticated: 'authenticated'
        })
    })
    .component('main', component)
export default module.name