import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import orderItem from 'common/components/order_item/order_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';
let orderModule = angular.module('order', [
    uiRouter,
    orderItem,
    simpleHeader,
    AuthService,
    menuService,
  ])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.main.order', {
        url: 'order',
        template: '<order></order>',
        authenticated: 'authenticated'
      });
  })
  .component('order', orderComponent);

export default orderModule.name;