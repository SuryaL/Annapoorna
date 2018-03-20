import angular from 'angular';

import popup from 'common/services/popup';
import AddUserPopupFactory from './adduser.factory';

let adduserModule = angular.module('adduser.module', [
        popup,
    ])
    .factory('AddUserPopup', AddUserPopupFactory);

export default adduserModule.name;
