import angular from 'angular';

import orderFactory from './order.factory';

let orderModule = angular.module ('order.service', [ ])
.factory ('OrderService', orderFactory);

export default orderModule.name;
