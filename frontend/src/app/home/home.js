import angular from 'angular';
import uirouter from 'angular-ui-router';
import component from './home.component';

const module = angular.module( 'home', [uirouter] )

.config( function( $stateProvider ) {
    'ngInject';

    $stateProvider.state( 'app.home', {
        url: 'home',
        template : '<home></home>',
        authenticated : 'none'
    } )
} )
.component('home',component)
export default module.name

