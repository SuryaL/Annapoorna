import angular from 'angular';
import uirouter from 'angular-ui-router';

import controller from './home.controller';
import template from './home.html';
import './home.scss';

//
import roomServe from '../../common/services/room';
import colorPicker from '../../common/components/colpick/colpick';

const module = angular.module( 'home', [uirouter,roomServe,colorPicker] )
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

