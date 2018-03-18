import angular from 'angular';

import controller from './footerBtn.controller';
import template from './footerBtn.html';
import './footerBtn.scss';

let footerBtnComponent = {
  restrict: 'E',
  bindings: {
    "footText": "@",
    "callback": "="
  },
  template,
  controller,
  controllerAs: 'self'
};

export default footerBtnComponent;