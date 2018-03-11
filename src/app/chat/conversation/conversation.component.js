import template from './conversation.html';
import controller from './conversation.controller';
import './conversation.scss';

let conversationComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default conversationComponent;
