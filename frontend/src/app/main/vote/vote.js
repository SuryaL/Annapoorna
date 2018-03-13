import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import voteItem from 'common/components/vote_item/vote_item';
import footerBtn from 'common/components/footerBtn/footerBtn';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import menuBar from 'common/components/menu/menuBar/menuBar';
import menuIcon from 'common/components/menu/menuIcon/menuIcon';
import userBalance from 'common/components/menu/userBalance/userBalance';
import AuthService from 'common/services/auth';

const module = angular.module('vote', [
    menuBar,
    menuIcon,
    userBalance,
        uirouter,
        voteItem,
        simpleHeader,
        footerBtn,
        AuthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.main.vote', {
            url: 'vote',
            template: '<vote></vote>',
            authenticated: 'authenticated'
        })
    })
    .component('vote', component)
export default module.name