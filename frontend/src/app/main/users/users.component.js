import template from './users.html';
import controller from './users.controller';
import './users.scss';

let usersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default usersComponent;
