import angular from 'angular';
import oauthService from './oauth.service';

export default angular.module('oauthService',[])
    .service('oauthService',oauthService)
    .name;
