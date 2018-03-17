import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';

let usersModule = angular.module('users', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.users', {
    url : 'users',
    template : '<users></users>',
    authenticated: 'authenticated'
  });
})
.component('users', usersComponent);

export default usersModule.name;
