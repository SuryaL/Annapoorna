import angular from 'angular';
import roomService from './room.service';

export default angular.module('roomServe',[])
    .service('roomService',roomService)
    .name;
