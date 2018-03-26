import template from './quantity_picker.html';
import controller from './quantity_picker.controller';
import './quantity_picker.scss';

let quantityPickerComponent = {
  restrict: 'E',
  bindings: {
    quantity:'=?'
  },
  template,
  controller,
  controllerAs: 'self'
};

export default quantityPickerComponent;
