import angular from 'angular';
import uirouter from 'angular-ui-router';

import controller from './room.controller';
import template from './room.html';
import './room.scss';

//
import roomServe from '../../common/services/room';

const module = angular.module( 'room', [uirouter,roomServe] )
module.config( function( $stateProvider ) {
    'ngInject';

    $stateProvider.state( 'app.room', {
        url: 'room/:room_id',
        params:{
            room_id: null
        },
        template,
        controller,
        controllerAs: 'self'
    } )
} )
export default module.name

