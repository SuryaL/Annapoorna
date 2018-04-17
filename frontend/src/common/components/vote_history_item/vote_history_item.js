import angular from 'angular';
import uiRouter from 'angular-ui-router';
import voteHistoryItemComponent from './vote_history_item.component';
import VoteService from 'common/services/vote';

let voteHistoryItemModule = angular.module('voteHistoryItem', [
  uiRouter,
  VoteService
])
.config(($stateProvider) => {
  'ngInject';

  $stateProvider
  .state ('voteHistoryItem', {
    url : 'vote_history_item',
    template : '<vote-history-item></vote-history-item>',
    authenticated : 'none'
  });
})
.component('voteHistoryItem', voteHistoryItemComponent);

export default voteHistoryItemModule.name;
