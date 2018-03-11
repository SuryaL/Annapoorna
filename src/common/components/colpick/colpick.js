import angular from 'angular';
import colpickComponent from './colpick.component';

let colpickModule = angular.module('colpick', [])
.component('colpick', colpickComponent);

export default colpickModule.name;
