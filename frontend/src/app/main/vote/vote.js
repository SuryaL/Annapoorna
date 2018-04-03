import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import voteItem from 'common/components/vote_item/vote_item';
import footerBtn from 'common/components/footerBtn/footerBtn';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import headerBtn from 'common/components/header_btn/header_btn';
import timeRemaining from 'common/components/time_remaining/time_remaining';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';
import VoteService from 'common/services/vote';
import StatusService from 'common/services/status';



const module = angular.module('vote', [
        uirouter,
        voteItem,
        simpleHeader,
        timeRemaining,
        headerBtn,
        footerBtn,
        AuthService,
        menuService,
        VoteService,
        StatusService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.main.vote', {
            url: 'vote',
            template: '<vote></vote>',
            authenticated: 'authenticated',
            resolve: function($q, $auth, $state, $timeout) {
                'ngInject';
                let user = $auth.getUser() || {};
                return $q((resolve, reject) => {
                    if((user.type || []).includes('user')) {
                        resolve()
                    } else if((user.type || []).includes('cook')) {
                        $timeout(() => {
                            $state.go('app.main.orders');
                        })
                        reject();
                    }else{
                        $timeout(() => {
                            $state.go('app.main.profile');
                        })
                        reject();
                    }
                });
            }
        })
    })
    .component('vote', component)
export default module.name