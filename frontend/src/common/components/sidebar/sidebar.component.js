import template from './sidebar.html';
import controller from './sidebar.controller';
import './sidebar.scss';

let sidebarComponent = {
  restrict: 'E',
  bindings: {
    item : '='
  },
  template,
  controller,
  controllerAs: 'self'
};

export default sidebarComponent;
