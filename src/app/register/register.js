import angular from 'angular';
import registerComponent from './register.component';
import uirouter from 'angular-ui-router';

let registerModule = angular.module('register', [
        uirouter
    ])
    .component('register', registerComponent)
    .config(function($stateProvider) {
        'ngInject';
        $stateProvider.state('register', {
            url: '',
            abstract: true,
            template: '<register></register>',
            authenticated: false
        })
    })

export default registerModule.name;