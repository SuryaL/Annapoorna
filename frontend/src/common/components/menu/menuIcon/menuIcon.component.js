import angular from 'angular';

import controller from './menuIcon.controller';
import template from './menuIcon.html';
import './menuIcon.scss';

let menuIconComponent = {
  restrict: 'E',
  bindings: {
  },
  template,
  controller,
  controllerAs: 'self'
};

export default menuIconComponent;