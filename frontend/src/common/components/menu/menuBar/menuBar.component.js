import angular from 'angular';

import controller from './menuBar.controller';
import template from './menuBar.html';
import './menuBar.scss';

let menuBarComponent = {
  restrict: 'E',
  bindings: {
    tabs:'='
  },
  template,
  controller,
  controllerAs: 'self'
};

export default menuBarComponent;