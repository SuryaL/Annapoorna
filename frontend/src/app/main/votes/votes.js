import angular from 'angular';
import uiRouter from 'angular-ui-router';
import votesComponent from './votes.component';
import voteHistoryItem from 'common/components/vote_history_item/vote_history_item';
import simpleHeader from 'common/components/simpleHeader/simpleHeader';
import footerBtn from 'common/components/footerBtn/footerBtn';
import headerBtn from 'common/components/header_btn/header_btn';
import AuthService from 'common/services/auth';
import VoteService from 'common/services/vote';
import OrderService from 'common/services/order';
import menuService from 'common/services/menu';
import StatusService from 'common/services/status';

import votedetails from 'common/services/voteDetails';

let votesModule = angular.module('votes', [
  uiRouter,
  uiRouter,
  voteHistoryItem,
  simpleHeader,
  footerBtn,
  headerBtn,
  AuthService,
  VoteService,
  OrderService,
  menuService,
  StatusService,
  votedetails
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('app.main.votes', {
    url : 'votes',
    template : '<votes></votes>',
    authenticated : 'authenticated',
    resolve: {
      valid: function($q, $auth) {
          'ngInject';
          let user = $auth.getUser() || {};
          return $q((resolve, reject) => {
              if((user.type || []).includes('admin')) {
                  resolve()
              } else {
                  reject();
              }
          });
      }
  }
  });
})
.component('votes', votesComponent);

export default votesModule.name;
