import angular from 'angular';
import currencyFormatDirective from './currencyFormat.directive';

let currencyFormatModule = angular.module ('currencyFormat.directive', [
])
.directive ('currencyFormat', currencyFormatDirective);

export default currencyFormatModule.name;