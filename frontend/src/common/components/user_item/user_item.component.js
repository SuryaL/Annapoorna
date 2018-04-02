import template from './user_item.html';
import controller from './user_item.controller';
import './user_item.scss';

let userItemComponent = {
  restrict: 'E',
  bindings: {
    item:'=',
    payAmount:'=?'
  },
  template,
  controller,
  controllerAs: 'self'
};

export default userItemComponent;
