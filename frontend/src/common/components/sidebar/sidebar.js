import angular from 'angular';
import sidebarComponent from './sidebar.component';
import uirouter from 'angular-ui-router';

import conversationServe from '../../services/conversations';


let sidebarModule = angular.module('sidebar', [uirouter])
.component('sidebar', sidebarComponent)
.config( function( $stateProvider ) {
    'ngInject';

    // $stateProvider.state( 'app.sidebar', {
    //     url: 'sidebar',
    //     template:'<sidebar></sidebar>',
    //     authenticated : true
    // } )
} )
export default sidebarModule.name;
