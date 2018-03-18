import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import historyItem from 'common/components/history_item/history_item';

let historyModule = angular.module('history', [
  uiRouter,
  historyItem
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.history', {
    url : 'history',
    template : '<history></history>',
    authenticated : 'authenticated'
  });
})
.component('history', historyComponent);

export default historyModule.name;
