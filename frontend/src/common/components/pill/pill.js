import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pillComponent from './pill.component';

let pillModule = angular.module('pill', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('pill', {
  //   url : 'pill',
  //   template : '<pill></pill>',
  //   authenticated : 'none'
  // });
})
.component('pill', pillComponent);

export default pillModule.name;
