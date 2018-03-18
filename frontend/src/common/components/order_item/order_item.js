import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderItemComponent from './order_item.component';
import AuthService from 'common/services/auth';
import QuantityPicker from 'common/components/quantity_picker/quantity_picker';

let orderItemModule = angular.module('orderItem', [
  uiRouter,
  AuthService,
  QuantityPicker
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('orderItem', {
  //   url : 'order_item',
  //   template : '<order-item></order-item>',
  //   authenticated : 'none'
  // });
})
.component('orderItem', orderItemComponent);

export default orderItemModule.name;
