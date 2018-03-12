import angular from 'angular';
import AuthService from './auth.service';
import OauthService from './oauth.factory';
import OauthInterceptor from './interceptor.factory';

export default angular.module('authService', [])
    .factory('OauthService', OauthService)
    .service('$auth', AuthService)
    .factory('OauthInterceptor', OauthInterceptor)
    .name;