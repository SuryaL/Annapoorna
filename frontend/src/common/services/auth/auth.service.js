let AuthFactory = function($q, $window, $log, $rootScope, $http, $state) { //,CryptoJS
    'ngInject';
    var self = {};
    //var crypto_secret = '7VK14AQa8Lnl0IK5lo2TC10l79xx8mc2';
    var tokenName = 'annapoorna_token';
    var userName = 'annapoorna_user';

    self.tokenName = tokenName;
    self.userName = userName;
    self.baseUrl = ENV.API_URL;
    self.authHeader = 'Authorization';
    self.authToken = 'Bearer';
    self.loginUrl = '/auth/login';
    self.signupUrl = '/auth/signup';
    self.forgotUrl = '/auth/forgot';
    self.exchangeUrl = '/auth/exchange';
    self.linkUrl = '/auth/link';
    self.changeUrl = '/auth/change';
    self.setUrl = '/auth/set';
    self.verifyUrl = '/auth/verify';
    self.resendUrl = '/auth/resend';
    self.unlinkUrl = '/auth/unlink';
    self.forgotSMSUrl = '/auth/forgot/sms';
    self.verifySMSUrl = '/auth/verify/sms';

    self.getToken = function() {
        return $window.localStorage.getItem(tokenName);
    };

    self.getPayload = function() {
        var token = $window.localStorage.getItem(tokenName);

        if (token && token.split('.').length === 3) {
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            } catch (e) {
                return undefined;
            }
        }
    };

    self.getUser = function() {
        var localUser = $window.localStorage.getItem(userName);
        //var isUserEncrypted = $window.localStorage.getItem(userEncrypted);

        // if(!!isUserEncrypted && !!localUser ){
        //   var decryptedBytes = CryptoJS.AES.decrypt(localUser.toString(), crypto_secret);
        //   var userString = decryptedBytes.toString(CryptoJS.enc.Utf8);
        //   try {
        //     var userObj = JSON.parse(userString);
        //     return userObj;
        //   }catch(e){
        //     return userString;
        //   }
        // }else{
        localUser = JSON.parse(localUser);
        return localUser;
        //}
    };

    self.setUser = function(user) {
        setUserLocal(user);
    };

    function setUserLocal(user) {
        // if(!!OauthConfig.encryptUser && !!user ) {
        //   user = CryptoJS.AES.encrypt(JSON.stringify(user), crypto_secret).toString();
        //   $window.localStorage.setItem(userEncrypted, true);
        // }else{
        //   $window.localStorage.setItem(userEncrypted, false);
        // }
        if (typeof user == "object") user = JSON.stringify(user);
        $window.localStorage.setItem(userName, user);
    }

    self.setToken = function(response) {
        if (!response) {
            return $log.warn('Can\'t set token without passing a value');
        }


        var accessToken = response && response.access_token;
        var token, user;

        if (accessToken) {
            if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
                response = accessToken;
            } else if (angular.isString(accessToken)) {
                token = accessToken;
            }
        }

        if (!token && response) {
            token = response.data && response.data[tokenName];
            user = response.data && response.data[userName];
        }
        if (!token) {
            return $log.warn('Expecting a token named "' + tokenName);
        }

        $window.localStorage.setItem(tokenName, token);
        if (user != null) {
            // $window.localStorage.setItem(userName, user);
            setUserLocal(user);
        } else {
            var payload = self.getPayload();
            if (payload != null && payload.user != null) {
                // $window.localStorage.setItem(userName, payload.user);
                setUserLocal(payload.user);
            }
        }

    };

    self.removeToken = function() {
        $window.localStorage.removeItem(tokenName);
    };

    self.removeUser = function() {
        $window.localStorage.removeItem(userName);
    };

    /**
     * @returns {boolean}
     */
    self.isAuthenticated = function() {
        var token = $window.localStorage.getItem(tokenName);
        // A token is present
        if (token) {
            // Token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // Could be a valid JWT or an access token with the same format
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var exp = JSON.parse($window.atob(base64)).exp;
                    // JWT with an optonal expiration claims
                    if (exp) {
                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            // FAIL: Expired token
                            return false;
                        } else {
                            // PASS: Non-expired token
                            return true;
                        }
                    }
                } catch (e) {
                    // PASS: Non-JWT token that looks like JWT
                    return true;
                }
            }
            // PASS: All other tokens
            return true;
        }
        // FAIL: No token at all
        return false;
    };

    self.exchange = function(opts) {
        opts = opts || {};
        opts.url = opts.url ? opts.url : self.joinUrl(self.baseUrl, self.exchangeUrl);
        opts.method = opts.method || 'GET';
        opts.withCredentials = opts.withCredentials;
        return $http(opts).then(function(response) {
            let token = {
                access_token: response.data.token,
                user: response.data.user
            }
            self.setToken(token);
            return response;
        });
    }

    self.logout = function() {
        // equivalent
        return $q(function(resolve) {
            $window.localStorage.removeItem(tokenName);
            $window.localStorage.removeItem(userName)
            resolve(true);
            $rootScope.$broadcast('oauth.logout');
            $state.go('app.login');
        });
    };

    self.joinUrl = function(baseUrl, url) {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
        }

        var joined = [baseUrl, url].join('/');

        var normalize = function(str) {
            return str
                .replace(/[\/]+/g, '/')
                .replace(/\/\?/g, '?')
                .replace(/\/\#/g, '#')
                .replace(/\:\//g, '://');
        };

        return normalize(joined);
    };

    return self;
};

export default AuthFactory;