import angular from 'angular';
import uiRouter from 'angular-ui-router';
import historyComponent from './history.component';
import historyItem from 'common/components/history_item/history_item';
import footerBtn from 'common/components/footerBtn/footerBtn';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import headerBtn from 'common/components/header_btn/header_btn';

import AuthService from 'common/services/auth';
import menuService from 'common/services/menu';

let historyModule = angular.module('history', [
    uiRouter,
    headerBtn,
    footerBtn,
    simpleHeader,
    AuthService,
    menuService,
    historyItem
  ])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app.main.history', {
        url: 'history',
        template: '<history></history>',
        authenticated: 'authenticated'
      });
  })
  .component('history', historyComponent);

export default historyModule.name;