import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './vote_item.component';
import AuthService from 'common/services/auth';
import checkbox from 'common/components/checkbox/checkbox';
import toastr from 'common/services/mytoastr';
import starsy from 'common/directives/starsy';
import QuantityPicker from 'common/components/quantity_picker/quantity_picker';


const module = angular.module('voteItem', [
        uirouter,
        AuthService,
        toastr,
        checkbox,
        starsy,
        QuantityPicker
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