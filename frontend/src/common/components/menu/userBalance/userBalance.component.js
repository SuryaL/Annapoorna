import angular from 'angular';

import controller from './userBalance.controller';
import template from './userBalance.html';
import './userBalance.scss';

let userBalanceComponent = {
  restrict: 'E',
  bindings: {
  },
  template,
  controller,
  controllerAs: 'self'
};

export default userBalanceComponent;