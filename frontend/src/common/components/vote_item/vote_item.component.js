import angular from 'angular';

import controller from './vote_item.controller';
import template from './vote_item.html';
import './vote_item.scss';

let voteItemComponent = {
  restrict: 'E',
  bindings: {
    item : "=",
    isSelectedItem : "=",
    itemToggled : "=",
    votesCount : "="
    
  },
  template,
  controller,
  controllerAs: 'self'
};

export default voteItemComponent;