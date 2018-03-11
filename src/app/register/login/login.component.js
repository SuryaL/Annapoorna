import template from './login.html';
import controller from './login.controller';
import './login.scss';

let loginComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default loginComponent;
