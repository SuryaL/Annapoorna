import angular from 'angular';
import signupComponent from './signup.component';
import uirouter from 'angular-ui-router';

let signupModule = angular.module('signup', [
    uirouter
])
.component('signup', signupComponent)
.config( function( $stateProvider ) {
    'ngInject';
    $stateProvider.state( 'register.signup', {
        url: '/register/signup',
        template:'<signup></signup>',
        authenticated : false
    } )
})

export default signupModule.name;