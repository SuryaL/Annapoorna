import template from './profilepic.html';
import controller from './profilepic.controller';
import './profilepic.scss';

let profilepicComponent = {
  restrict: 'E',
  bindings: {
    image:'@',
  },
  template,
  controller,
  controllerAs: 'self'
};

export default profilepicComponent;
