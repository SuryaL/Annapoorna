import angular from 'angular';
import MymoFactory from './mymo.factory';

let mymoModule = angular.module ('mymo.service', [ ])
.factory ('Mymo', MymoFactory);

export default mymoModule.name;
