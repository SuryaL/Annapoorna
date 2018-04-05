import angular from 'angular';

import popup from 'common/services/popup';
import emailusersPopupFactory from './emailusers.factory';

let emailusersModule = angular.module('emailusers.module', [
        popup,
    ])
    .factory('EmailUsersPopup', emailusersPopupFactory);

export default emailusersModule.name;
