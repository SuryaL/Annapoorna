import angular from 'angular';
import TabsService from './tabs.service';

export default angular.module('tabsService', [])
    .service('TabsService', TabsService)
    .name;