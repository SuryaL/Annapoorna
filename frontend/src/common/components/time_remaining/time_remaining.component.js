import template from './time_remaining.html';
import controller from './time_remaining.controller';
import './time_remaining.scss';

let timeRemainingComponent = {
  restrict: 'E',
  bindings: {
    deadline:'='
  },
  template,
  controller,
  controllerAs: 'self'
};

export default timeRemainingComponent;
