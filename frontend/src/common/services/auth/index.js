import angular from 'angular';
import AuthService from './auth.service';
import OauthInterceptor from './interceptor.factory';

export default angular.module('authService',[])
    .service('$auth', AuthService)
    .factory ('OauthInterceptor', OauthInterceptor)
    .name;
