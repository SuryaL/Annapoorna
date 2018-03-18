import angular from 'angular';

import VoteFactory from './vote.factory';

let voteModule = angular.module ('vote.service', [ ])
.factory ('VoteService', VoteFactory);

export default voteModule.name;
