import angular from 'angular';
import uiRouter from 'angular-ui-router';
import voteHistoryItemComponent from './vote_history_item.component';

let voteHistoryItemModule = angular.module('voteHistoryItem', [
  uiRouter
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
