import angular from 'angular';
import formatDirective from './format.directive';

let formatModule = angular.module ('format.directive', [
])
.directive ('customFormat', formatDirective);

export default formatModule.name;