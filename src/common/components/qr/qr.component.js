import template from './qr.html';
import controller from './qr.controller';
import './qr.scss';

let qrComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'self'
};

export default qrComponent;
