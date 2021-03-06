import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import voteItem from 'common/components/vote_item/vote_item';
import footerBtn from 'common/components/footerBtn/footerBtn';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import headerBtn from 'common/components/header_btn/header_btn';
import timeRemaining from 'common/components/time_remaining/time_remaining';
import pill from 'common/components/pill/pill';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';
import VoteService from 'common/services/vote';
import StatusService from 'common/services/status';
import payment from 'common/services/payment';

const module = angular.module('vote', [
        uirouter,
        voteItem,
        pill,
        simpleHeader,
        timeRemaining,
        headerBtn,
        footerBtn,
        AuthService,
        menuService,
        VoteService,
        StatusService,
        payment
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.main.vote', {
            url: 'vote',
            template: '<vote></vote>',
            authenticated: 'authenticated',
            resolve: {
                valid: function($q, $auth, $state, $timeout) {
                    'ngInject';
                    let user = $auth.getUser() || {};
                    return $q((resolve, reject) => {
                        console.log(user.type, (user.type || []).includes('user'), (user.type || []).includes('cook'));
                        if((user.type || []).includes('user')) {
                            resolve()
                        } else if((user.type || []).includes('cook')) {
                            $timeout(() => {
                                $state.go('app.main.orders');
                            })
                            reject();
                        } else {
                            $timeout(() => {
                                $state.go('app.main.profile');
                            })
                            reject();
                        }
                    });
                }
            }
        })
    })
    .component('vote', component)
export default module.name