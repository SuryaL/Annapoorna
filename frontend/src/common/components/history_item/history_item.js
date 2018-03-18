import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyItemComponent from './history_item.component';

let historyItemModule = angular.module('historyItem', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('historyItem', {
  //   url : 'history_item',
  //   template : '<history-item></history-item>',
  //   authenticated : 'none'
  // });
})
.component('historyItem', historyItemComponent);

export default historyItemModule.name;
