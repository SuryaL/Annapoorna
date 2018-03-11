import template from './chat.html';
import controller from './chat.controller';
import './chat.scss';

let chatComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default chatComponent;
