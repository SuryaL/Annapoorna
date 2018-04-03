import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ordersComponent from './orders.component';
import historyItem from 'common/components/history_item/history_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';

import AuthService from 'common/services/auth';
import VoteService from 'common/services/vote';
import OrderService from 'common/services/order';
import menuService from 'common/services/menu';
import StatusService from 'common/services/status';
let ordersModule = angular.module('orders', [
  uiRouter,
  historyItem,
  simpleHeader,
  footerBtn,
  headerBtn,
  AuthService,
  VoteService,
  OrderService,
  menuService,
  StatusService
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state('app.main.orders', {
    url: 'orders',
    template: '<orders></orders>',
    authenticated: 'authenticated',
    resolve:function($q, $auth){
      'ngInject';
      let user = $auth.getUser() || {};
      return $q((resolve,reject) =>{
        if((user.type || []).includes('admin') || (user.type || []).includes('cook')){
          resolve()
        }else{
          reject();
        }
      });
    }
  });
})
.component('orders', ordersComponent);

export default ordersModule.name;
