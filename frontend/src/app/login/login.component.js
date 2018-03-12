import angular from 'angular';

import controller from './login.controller';
import template from './login.html';
import './login.scss';

let loginComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default loginComponent;