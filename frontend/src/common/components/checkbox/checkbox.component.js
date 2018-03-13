import angular from 'angular';

import controller from './checkbox.controller';
import template from './checkbox.html';
import './checkbox.scss';

let checkboxComponent = {
  restrict: 'E',
  bindings: {
    toggleVar: "="
  },
  template,
  controller,
  controllerAs: 'self'
};

export default checkboxComponent;