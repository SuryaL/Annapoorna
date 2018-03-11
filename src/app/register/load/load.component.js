import template from './load.html';
import controller from './load.controller';
import './load.scss';

let loadComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default loadComponent;
