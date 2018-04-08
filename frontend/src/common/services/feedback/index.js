import angular from 'angular';

import popup from 'common/services/popup';
import feedbackPopupFactory from './feedback.factory';

import starsy from 'common/directives/starsy';

let feedbackModule = angular.module('feedback.module', [
        popup,
        starsy
    ])
    .factory('FeedbackPopup', feedbackPopupFactory);

export default feedbackModule.name;
