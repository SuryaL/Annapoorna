import angular from 'angular';

import controller from './simpleHeader.controller';
import template from './simpleHeader.html';
import './simpleHeader.scss';

let simpleHeaderComponent = {
  restrict: 'E',
  bindings: {
    headTitle:'=',
    subheadTitle:'='
  },
  template,
  controller,
  controllerAs: 'self'
};

export default simpleHeaderComponent;