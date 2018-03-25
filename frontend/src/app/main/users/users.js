import angular from 'angular';
import uiRouter from 'angular-ui-router';
import usersComponent from './users.component';
import userItem from 'common/components/user_item/user_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';
import inputPlaceholder from 'common/directives/inputPlaceholder';
import toastr from 'common/services/mytoastr';

import AuthService from 'common/services/auth';
import userService from 'common/services/user';
import adduser from 'common/services/adduser';

let usersModule = angular.module('users', [
    uiRouter,
    toastr,
    userItem,
    headerBtn,
    footerBtn,
    simpleHeader,
    AuthService,
    userService,
    adduser,
    inputPlaceholder
  ])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.main.users', {
        url: 'users',
        template: '<users></users>',
        authenticated: 'authenticated',
        resolve:function($q, $auth){
          'ngInject';
          this.user = this.$auth.getUser() || {};
          return $q((resolve,reject) =>{
            if((this.user.type || []).includes('admin')){
              resolve()
            }else{
              reject();
            }
          });
        }
      });
  })
  .component('users', usersComponent);

export default usersModule.name;