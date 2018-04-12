import template from './votes.html';
import controller from './votes.controller';
import './votes.scss';

let votesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default votesComponent;
