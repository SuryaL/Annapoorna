import angular from 'angular';
import MenuService from './menu.service';

export default angular.module('menuService', [])
    .service('MenuService', MenuService)
    .name;