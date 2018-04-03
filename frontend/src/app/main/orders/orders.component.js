import template from './orders.html';
import controller from './orders.controller';
import './orders.scss';

let ordersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default ordersComponent;
