import template from './vote_history_item.html';
import controller from './vote_history_item.controller';
import './vote_history_item.scss';

let voteHistoryItemComponent = {
  restrict: 'E',
  bindings: {
    "item" : "="
  },
  template,
  controller,
  controllerAs: 'self'
};

export default voteHistoryItemComponent;
