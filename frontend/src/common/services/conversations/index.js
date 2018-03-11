import angular from 'angular';
import conversationService from './conversation.service';

export default angular.module('conversationServe',[])
    .service('conversationService',conversationService)
    .name;
