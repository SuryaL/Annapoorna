import template from './time_remaining.html';
import controller from './time_remaining.controller';
import './time_remaining.scss';

let timeRemainingComponent = {
  restrict: 'E',
  bindings: {
    deadline:'=',
    timeRemaining:'=?',
    timePassed:"=?"
  },
  template,
  controller,
  controllerAs: 'self'
};

export default timeRemainingComponent;
