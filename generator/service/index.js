import angular from 'angular';

import <%= upCaseName %>Factory from './<%= name %>.factory';

let <%= camelCaseName %>Module = angular.module ('<%= name %>.service', [ ])
.factory ('<%= upCaseName %>', <%= upCaseName %>Factory);

export default <%= camelCaseName %>Module.name;
