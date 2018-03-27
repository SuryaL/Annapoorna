import template from './order_item.html';
import controller from './order_item.controller';
import './order_item.scss';

let orderItemComponent = {
  restrict: 'E',
  bindings: {
    item:'='
  },
  template,
  controller,
  controllerAs: 'self'
};

export default orderItemComponent;
