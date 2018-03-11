import angular from 'angular';
import qrComponent from './qr.component';

let qrModule = angular.module('qr', [])
.component('qr', qrComponent)
// .config( function( $stateProvider ) {
//     'ngInject';

//     $stateProvider.state( 'app.qr', {
//         url: 'qr',
//         template:'<qr></qr>',
//         authenticated : true
//     } )
// } )
export default qrModule.name;
