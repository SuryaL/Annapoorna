import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote_item.component';
import AuthService from 'common/services/auth';
import checkbox from 'common/components/checkbox/checkbox';
import toastr from 'common/services/mytoastr';
import starsy from 'common/directives/starsy';


const module = angular.module('voteItem', [
        uirouter,
        AuthService,
        toastr,
        checkbox,
        starsy
    ])

    .config(function($stateProvider) {
        'ngInject';

        // $stateProvider.state('app.main.vote', {
        //     url: 'vote',
        //     template: '<vote></vote>',
        //     authenticated: 'none'
        // })
    })
    .component('voteItem', component)
export default module.name