import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderComponent from './order.component';
import orderItem from 'common/components/order_item/order_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';
import timeRemaining from 'common/components/time_remaining/time_remaining';

import AuthService from 'common/services/auth';
import VoteService from 'common/services/vote';
import OrderService from 'common/services/order';
import menuService from 'common/services/menu';
import StatusService from 'common/services/status';

let orderModule = angular.module('order', [
    uiRouter,
    orderItem,
    headerBtn,
    footerBtn,
    timeRemaining,
    simpleHeader,
    AuthService,
    VoteService,
    StatusService,
    menuService,
    OrderService
  ])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.main.order', {
        url: 'order',
        template: '<order></order>',
        authenticated: 'authenticated',
        resolve:function($q, $auth){
          'ngInject';
          let user = $auth.getUser() || {};
          return $q((resolve,reject) =>{
            if((user.type || []).includes('user')){
              resolve()
            }else{
              reject();
            }
          });
        }
      });
  })
  .component('order', orderComponent);

export default orderModule.name;