import template from './history_item.html';
import controller from './history_item.controller';
import './history_item.scss';

let historyItemComponent = {
  restrict: 'E',
  bindings: {
    "item" : "=",
    "individualOrderDetails" : "="
  },
  template,
  controller,
  controllerAs: 'self'
};

export default historyItemComponent;
