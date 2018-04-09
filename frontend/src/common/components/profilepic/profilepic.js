import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profilepicComponent from './profilepic.component';

let profilepicModule = angular.module('profilepic', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('profilepic', {
  //   url : 'profilepic',
  //   template : '<profilepic></profilepic>',
  //   authenticated : 'none'
  // });
})
.component('profilepic', profilepicComponent);

export default profilepicModule.name;
