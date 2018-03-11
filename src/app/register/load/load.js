import angular from 'angular';
import loadComponent from './load.component';
import uirouter from 'angular-ui-router';

let loadModule = angular.module('load', [
    uirouter
])
.component('load', loadComponent)
.config( function( $stateProvider ) {
    'ngInject';
    $stateProvider.state( 'register.load', {
        url: '/register/load',
        template:'<load></load>',
        authenticated : false
    } )
})

export default loadModule.name;