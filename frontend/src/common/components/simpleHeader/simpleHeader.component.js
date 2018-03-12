import angular from 'angular';

import controller from './order_item.controller';
import template from './order_item.html';
import './order_item.scss';

let orderItemComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default orderItemComponent;