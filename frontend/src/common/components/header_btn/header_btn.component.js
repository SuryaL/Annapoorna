import template from './header_btn.html';
import controller from './header_btn.controller';
import './header_btn.scss';

let headerBtnComponent = {
  restrict: 'E',
  bindings: {
    "headText": "@",
    "callback": "="
  },
  template,
  controller,
  controllerAs: 'self'
};

export default headerBtnComponent;
