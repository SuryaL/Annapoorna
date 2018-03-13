import angular from 'angular';

import controller from './vote_item.controller';
import template from './vote_item.html';
import './vote_item.scss';

let voteItemComponent = {
  restrict: 'E',
  bindings: {
    itemName : "@",
  },
  template,
  controller,
  controllerAs: 'self'
};

export default voteItemComponent;