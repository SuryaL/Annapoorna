import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userItemComponent from './user_item.component';
import currencyFormat from 'common/directives/currencyFormat';
import profilepic from 'common/components/profilepic/profilepic';
import user from 'common/services/user';
import payment from 'common/services/payment';
import toastr from 'common/services/mytoastr';

let userItemModule = angular.module('userItem', [
  uiRouter,
  currencyFormat,
  profilepic,
  user,
  payment,
  toastr
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('userItem', {
  //   url : 'user_item',
  //   template : '<user-item></user-item>',
  //   authenticated : 'none'
  // });
})
.component('userItem', userItemComponent);

export default userItemModule.name;
