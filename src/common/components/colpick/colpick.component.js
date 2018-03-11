import template from './colpick.html';
import controller from './colpick.controller';
import './colpick.scss';

let colpickComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default colpickComponent;
