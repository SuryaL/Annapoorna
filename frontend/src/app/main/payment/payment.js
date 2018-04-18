import angular from 'angular';
import uiRouter from 'angular-ui-router';
import paymentComponent from './payment.component';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';
import AuthService from 'common/services/auth';
import OrderService from 'common/services/order';
import menuService from 'common/services/menu';
import paymentService from 'common/services/payment';

let paymentModule = angular.module('payment', [
  uiRouter,
  simpleHeader,
  footerBtn,
  headerBtn,
  AuthService,
  OrderService,
  menuService,
  paymentService
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.payment', {
    url : 'payment',
    template : '<payment></payment>',
    authenticated : 'authenticated',
    resolve: {
      valid: function($q, $auth) {
          'ngInject';
          let user = $auth.getUser() || {};
          return $q((resolve, reject) => {
              if((user.type || []).includes('user')) {
                  resolve()
              } else {
                  reject();
              }
          });
      }
  }
  });
})
.component('payment', paymentComponent);

export default paymentModule.name;
