import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './login.component';
import AuthService from 'common/services/auth';
import toastr from 'common/services/mytoastr';


const module = angular.module('login', [
        uirouter,
        toastr,
        AuthService
    ])

    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('app.login', {
            url: 'login',
            template: '<login></login>',
            authenticated: 'none'
        })
    })
    .component('login', component)
export default module.name