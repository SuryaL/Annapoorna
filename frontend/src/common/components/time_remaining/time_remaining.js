import angular from 'angular';
import uiRouter from 'angular-ui-router';
import timeRemainingComponent from './time_remaining.component';

let timeRemainingModule = angular.module('timeRemaining', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('timeRemaining', {
  //   url : 'time_remaining',
  //   template : '<time-remaining></time-remaining>',
  //   authenticated : 'none'
  // });
})
.component('timeRemaining', timeRemainingComponent);

export default timeRemainingModule.name;
