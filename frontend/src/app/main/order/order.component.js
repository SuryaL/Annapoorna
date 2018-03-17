import template from './order.html';
import controller from './order.controller';
import './order.scss';

let orderComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default orderComponent;
