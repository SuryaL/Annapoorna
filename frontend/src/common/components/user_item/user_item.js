import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userItemComponent from './user_item.component';

let userItemModule = angular.module('userItem', [
  uiRouter
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
