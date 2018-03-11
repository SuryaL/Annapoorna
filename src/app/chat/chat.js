import angular from 'angular';
import chatComponent from './chat.component';
import uirouter from 'angular-ui-router';
import Sidebar from "../../common/components/sidebar/sidebar";

// QR ///
// import qr from '../../common/components/qr/qr';
import qrcode from 'qrcode-generator';
// import qrcode_UTF8 from '/node_modules/qrcode-generator/qrcode_UTF8';
import ngQrcode from 'angular-qrcode';
///

import conversation from './conversation/conversation';
import conversationServe from '../../common/services/conversations';


let chatModule = angular.module('chat', [
    uirouter,
    conversation,
    ngQrcode,
    Sidebar,
    conversationServe
])
.component('chat', chatComponent)
.config( function( $stateProvider ) {
    'ngInject';

    $stateProvider.state( 'app.chat', {
        url: 'chat',
        template:'<chat></chat>',
        authenticated : true
    } )
    
} )
export default chatModule.name;
