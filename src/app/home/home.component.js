import angular from 'angular';

import controller from './home.controller';
import template from './home.html';
import './home.scss';

let homeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default homeComponent;