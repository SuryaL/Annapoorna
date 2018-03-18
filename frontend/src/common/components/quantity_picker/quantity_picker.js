import angular from 'angular';
import uiRouter from 'angular-ui-router';
import quantityPickerComponent from './quantity_picker.component';

let quantityPickerModule = angular.module('quantityPicker', [
  uiRouter
])
.config(($stateProvider) => {
  'ngInject';

  // $stateProvider
  // .state ('quantityPicker', {
  //   url : 'quantity_picker',
  //   template : '<quantity-picker></quantity-picker>',
  //   authenticated : 'none'
  // });
})
.component('quantityPicker', quantityPickerComponent);

export default quantityPickerModule.name;
