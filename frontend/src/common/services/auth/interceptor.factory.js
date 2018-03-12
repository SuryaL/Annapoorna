
let OauthInterceptor = function ($location, $q, $auth, $window) {
  'ngInject';

  var self = {};

    /**
     * request - when a request is made this function will intercept the request and attach a token to it
     * @param  {Object} request configuration object for the request
     * @return {Object} returns the configuration object for the request
     */
  self.request = function (request) {
    if (request.skipAuthorization) {
      return request;
    }

    if ($auth.isAuthenticated()) {
      var tokenName = $auth.tokenName;
      var token = $window.localStorage.getItem(tokenName);

      if ($auth.authHeader && $auth.authToken) {
        token = $auth.authToken + ' ' + token;
      }

      request.headers[$auth.authHeader] = token;
    };

    return request;
  };

  /**
   * responseError - when the request receives a request check to see if it was unauthorized
   * @param  {Object} response the response from the server
   * @return {Object} returns the promise of the rejected response
   */
  self.responseError = function ( response ) {

    if ( response.status === 401 && $location.path().indexOf ('login') === -1) {
      $auth.logout();
      $location.path ('#/login').search ('returnTo', $location.path());
    }

    return $q.reject ( response );
  };


  return self;
};

export default OauthInterceptor;
