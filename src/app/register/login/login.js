import angular from 'angular';
import loginComponent from './login.component';
import uirouter from 'angular-ui-router';

let loginModule = angular.module('login', [
    uirouter
])
.component('login', loginComponent)
.config( function( $stateProvider ) {
    'ngInject';
    $stateProvider.state( 'register.login', {
        url: '/register/login',
        template:'<login></login>',
        authenticated : false
    } )
})

export default loginModule.name;