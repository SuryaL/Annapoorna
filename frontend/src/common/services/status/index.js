import angular from 'angular';

import StatusFactory from './status.factory';

let statusModule = angular.module ('status.service', [ ])
.factory ('StatusService', StatusFactory);

export default statusModule.name;
