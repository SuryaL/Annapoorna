import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileComponent from './profile.component';

let profileModule = angular.module('profile', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.profile', {
    url : 'profile',
    template : '<profile></profile>',
    authenticated: 'authenticated'
  });
})
.component('profile', profileComponent);

export default profileModule.name;
