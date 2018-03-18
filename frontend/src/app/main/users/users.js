import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userItem from 'common/components/user_item/user_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';
let usersModule = angular.module('users', [
    uiRouter,
    userItem,
    simpleHeader,
    AuthService,
    menuService
  ])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.main.users', {
        url: 'users',
        template: '<users></users>',
        authenticated: 'authenticated'
      });
  })
  .component('users', usersComponent);

export default usersModule.name;