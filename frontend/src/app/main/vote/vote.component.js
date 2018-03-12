import angular from 'angular';

import controller from './vote.controller';
import template from './vote.html';
import './vote.scss';

let voteComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default voteComponent;