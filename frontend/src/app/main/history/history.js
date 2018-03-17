import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';

let historyModule = angular.module('history', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.history', {
    url : '/history',
    template : '<history></history>',
    authenticated : 'authenticated'
  });
})
.component('history', historyComponent);

export default historyModule.name;
