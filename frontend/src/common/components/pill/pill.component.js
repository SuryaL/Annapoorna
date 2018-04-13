import template from './pill.html';
import controller from './pill.controller';
import './pill.scss';

let pillComponent = {
  restrict: 'E',
  bindings: {
    vtext:'@',
    vprice:'@',
    vassure:'=',
    callback:'&?'
  },
  template,
  controller,
  controllerAs: 'self'
};

export default pillComponent;
