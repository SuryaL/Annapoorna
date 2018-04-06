import angular from 'angular';

import popup from 'common/services/popup';
import orderdetailsPopupFactory from './orderdetails.factory';

let orderdetailsModule = angular.module('orderdetails.module', [
        popup,
    ])
    .factory('OrderDetailsPopup', orderdetailsPopupFactory);

export default orderdetailsModule.name;
