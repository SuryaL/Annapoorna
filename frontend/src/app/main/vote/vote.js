import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote.component';
import OauthService from 'common/services/oauth';
import voteItem from 'common/components/vote_item/vote_item';

const module = angular.module('vote', [
        uirouter,
        OauthService,
        voteItem
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