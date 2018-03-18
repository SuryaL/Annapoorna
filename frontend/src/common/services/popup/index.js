import angular from 'angular';

import PopupProvider from './popup.provider';
import PopupDirective from './popup.directive';

let popupModule = angular.module ('popup', [])
.provider ('$popup', PopupProvider)
.directive ('popup', PopupDirective);

export default popupModule.name;
