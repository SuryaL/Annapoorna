import angular from 'angular';

import controller from './main.controller';
import template from './main.html';
import './main.mobile.scss';
import './main.desktop.scss';

let mainComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default mainComponent;