import angular from 'angular';

import popup from 'common/services/popup';
import votedetailsPopupFactory from './votedetails.factory';
console.log(popup);
let votedetailsModule = angular.module('votedetails.module', [
        popup,
    ])
    .factory('VoteDetailsPopup', votedetailsPopupFactory);

export default votedetailsModule.name;
