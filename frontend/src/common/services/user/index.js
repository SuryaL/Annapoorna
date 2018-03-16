import angular from 'angular';
import UserService from './user.service';

export default angular.module('userService', [])
    .service('UserService', UserService)
    .name;