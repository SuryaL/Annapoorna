import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import voteItem from 'common/components/vote_item/vote_item';
import footerBtn from 'common/components/footerBtn/footerBtn';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';

const module = angular.module('vote', [
        uirouter,
        voteItem,
        simpleHeader,
        footerBtn,
        AuthService,
        menuService
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