import angular from 'angular';
import Storage from 'stax2/frontend/services/storage';

import <%= upCaseName %>Factory from './<%= name %>.factory';

let <%= camelCaseName %>Module = angular.module ('<%= name %>.service', [ Storage ])
.factory ('<%= upCaseName %>', <%= upCaseName %>Factory);

export default <%= camelCaseName %>Module.name;
