import template from './history.html';
import controller from './history.controller';
import './history.scss';

let historyComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default historyComponent;
