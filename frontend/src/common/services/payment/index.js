import angular from 'angular';

import paymentFactory from './payment.factory';

let paymentModule = angular.module ('payment.service', [ ])
.factory ('PaymentService', paymentFactory);

export default paymentModule.name;
