let OauthInterceptor = function($location, $q, $window, $rootScope) {
    'ngInject';

    var self = {};

    /**
     * request - when a request is made this function will intercept the request and attach a token to it
     * @param  {Object} request configuration object for the request
     * @return {Object} returns the configuration object for the request
     */
    self.request = function(request) {
        if (request.skipAuthorization) {
            return request;
        }
        var token = $window.localStorage.getItem('annapoorna_token');
        token = 'Bearer' + ' ' + token;
        request.headers['Authorization'] = token;

        return request;
    };

    /**
     * responseError - when the request receives a request check to see if it was unauthorized
     * @param  {Object} response the response from the server
     * @return {Object} returns the promise of the rejected response
     */
    self.responseError = function(response) {

        if (response.status === 401 && $location.path().indexOf('login') === -1) {
            $rootScope.$broadcast('oauth.errlogout');
            $location.path('#/login').search('returnTo', $location.path());
        }

        return $q.reject(response);
    };


    return self;
};

export default OauthInterceptor;