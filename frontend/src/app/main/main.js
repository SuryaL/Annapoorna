import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './main.component';
import AuthService from 'common/services/auth';
import TabsService from 'common/services/tabs';

import menuBar from 'common/components/menu/menuBar/menuBar';
import menuIcon from 'common/components/menu/menuIcon/menuIcon';
import userBalance from 'common/components/menu/userBalance/userBalance';
import profilepic from 'common/components/profilepic/profilepic';

import vote from './vote/vote';
import order from './order/order';
import history from './history/history';
import users from './users/users';
import profile from './profile/profile';
import orders from './orders/orders';
import votes from './votes/votes';
import payment from './payment/payment';

import feedback from 'common/services/feedback';
import releasenotes from 'common/services/releasenotes';
import user from 'common/services/user';

const module = angular.module('main', [
        menuBar,
        menuIcon,
        userBalance,
        uirouter,
        AuthService,
        payment,
        vote,
        order,
        history,
        users,
        profile,
        TabsService,
        orders,
        feedback,
        releasenotes,
        profilepic,
        user,
        votes
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