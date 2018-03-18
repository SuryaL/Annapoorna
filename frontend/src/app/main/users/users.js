import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userItem from 'common/components/user_item/user_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';

import AuthService from 'common/services/auth';
import userService from 'common/services/user';
let usersModule = angular.module('users', [
    uiRouter,
    userItem,
    headerBtn,
    footerBtn,
    simpleHeader,
    AuthService,
    userService
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