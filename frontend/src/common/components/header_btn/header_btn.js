import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headerBtnComponent from './header_btn.component';

let headerBtnModule = angular.module('headerBtn', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('headerBtn', {
  //   url : 'header_btn',
  //   template : '<header-btn></header-btn>',
  //   authenticated : 'none'
  // });
})
.component('headerBtn', headerBtnComponent);

export default headerBtnModule.name;
