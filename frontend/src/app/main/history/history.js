import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import historyItem from 'common/components/history_item/history_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';

import AuthService from 'common/services/auth';
import VoteService from 'common/services/vote';
import OrderService from 'common/services/order';
import menuService from 'common/services/menu';
import StatusService from 'common/services/status';
let historyModule = angular.module('history', [
    uiRouter,
    headerBtn,
    footerBtn,
    simpleHeader,
    AuthService,
    menuService,
    historyItem,
    VoteService,
    OrderService,
    StatusService
  ])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
            .state('app.main.history', {
                url: 'history',
                template: '<history></history>',
                authenticated: 'authenticated',
                resolve:function($q, $auth){
                  'ngInject';
                  let user = $auth.getUser() || {};
                  return $q((resolve,reject) =>{
                    if((user.type || []).includes('user')){
                      resolve()
                    }else{
                      reject();
                    }
                  });
                }
            });
    })
    .component('history', historyComponent);

export default historyModule.name;