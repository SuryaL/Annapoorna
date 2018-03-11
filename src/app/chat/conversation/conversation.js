import angular from 'angular';
import conversationComponent from './conversation.component';
import uirouter from 'angular-ui-router';

let conversationModule = angular.module('conversation', [
    uirouter
])
.component('conversation', conversationComponent)
.config( function( $stateProvider ) {
    'ngInject';
    $stateProvider.state( 'app.chat.conversation', {
        url: '/conversation',
        template:'<conversation></conversation>',
        authenticated : true,
        params:{
            item: null
        }
    } )
})

export default conversationModule.name;