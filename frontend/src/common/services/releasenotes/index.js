import angular from 'angular';

import popup from 'common/services/popup';
import releasenotesPopupFactory from './releasenotes.factory';

let releasenotesModule = angular.module('releasenotes.module', [
        popup,
    ])
    .factory('ReleasenotesPopup', releasenotesPopupFactory);

export default releasenotesModule.name;
