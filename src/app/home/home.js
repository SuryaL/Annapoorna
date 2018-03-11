import angular from 'angular';
import uirouter from 'angular-ui-router';

import controller from './home.controller';
import template from './home.html';
import './home.scss';

const module = angular.module( 'home', [uirouter] )
module.config( function( $stateProvider ) {
    'ngInject';

    $stateProvider.state( 'app.home', {
        url: 'home',
        template,
        controller,
        controllerAs: 'self'
    } )
} )
export default module.name

