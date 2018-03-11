import template from './register.html';
import controller from './register.controller';
import './register.scss';

let registerComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default registerComponent;
