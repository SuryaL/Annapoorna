import angular from 'angular';
import MenuService from './menu.service';

export default angular.module('menuService', [])
    .service('MenuService', MenuService)
    .constant('MenuVotingLimit', 15)
    .name;