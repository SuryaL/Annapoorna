let OauthFactory = function($http, $q, $window, $interval) {
    'ngInject';

    var self = this;
    let facebook = {
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.12/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    }
    self.open = function(options, userData, customOptions) {
        defaults = OauthUtils.merge(options, defaults);
        defaults = OauthUtils.merge(customOptions, defaults);
        return $q(function(resolve, reject) {

            $timeout(function() {
                var url;
                var openPopup;
                url = [defaults.authorizationEndpoint, self.buildQueryString()].join('?');
                openPopup = popupHandle(url, defaults.name, defaults.popupOptions, defaults.redirectUri)

                openPopup
                    .then(function(oauthData) {
                        // When no server URL provided, return popup params as-is.
                        // This is for a scenario when someone wishes to opt out from
                        // auth's magic by doing authorization code exchange and
                        // saving a token manually.
                        if (defaults.responseType === 'token' || !defaults.url) {
                            return resolve(oauthData);
                        }

                        if (oauthData.state && oauthData.state !== OauthStorage.get(stateName)) {
                            return reject(
                                'The value returned in the state parameter does not match the state value from your original ' +
                                'authorization code request.'
                            );
                        }

                        resolve(oauthData);
                    }, function(err) {
                        reject(err);
                    });
            });
        });
    };

    self.buildQueryString = function() {
        var keyValuePairs = [];
        var urlParamsCategories = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

        angular.forEach(urlParamsCategories, function(paramsCategory) {
            angular.forEach(defaults[paramsCategory], function(paramName) {
                var camelizedName = OauthUtils.camelCase(paramName);
                var paramValue = angular.isFunction(defaults[paramName]) ? defaults[paramName]() : defaults[camelizedName];

                if (paramName === 'redirect_uri' && !paramValue) {
                    return;
                }

                if (paramName === 'state') {
                    var stateName = defaults.name + '_state';
                    paramValue = OauthStorage.get(stateName);
                }

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                    paramValue = paramValue.join(defaults.scopeDelimiter);

                    if (defaults.scopePrefix) {
                        paramValue = [defaults.scopePrefix, paramValue].join(defaults.scopeDelimiter);
                    }
                }

                keyValuePairs.push([paramName, encodeURIComponent(paramValue)]);
            });
        });

        return keyValuePairs.map(function(pair) {
            return pair.join('=');
        }).join('&');
    };

    self.popupHandle = function() {
        return $q(function(resolve, reject) {
            var response = response.data;
            var redirectUriParser = document.createElement('a');
            redirectUriParser.href = 'http://54.205.177.2/';
            var redirectUriPath = self.getFullUrlPath(redirectUriParser);

            var window_test = $window.open(response.links[1].href, '_blank', "width=950,height=780");
            $window.popup = window_test;
            console.log(redirectUriPath);
            var polling = $interval(function() {
                if (!window_test || window_test.closed || window_test.closed == undefined) {
                    $interval.cancel(polling);
                    resolve(false);
                }
                try {
                    var popupWindowPath = self.getFullUrlPath(window_test.location);
                    console.log(redirectUriPath, popupWindowPath);
                    if (popupWindowPath === redirectUriPath) {
                        // Contains query/hash parameters as expected.
                        if (window_test.location.search || window_test.location.hash) {
                            var queryParams = window_test.location.search.substring(1).replace(/\/$/, '');
                            var hashParams = window_test.location.hash.substring(1).replace(/[\/$]/, '');
                            var hash = self.parseQueryString(hashParams);
                            var qs = self.parseQueryString(queryParams);

                            angular.extend(qs, hash);

                            if (qs.error) {
                                console.log("create payment popup error:", qs);

                            } else {
                                console.log("create payment popup response:", qs);
                            }
                        } else {
                            // Does not contain query/hash parameters, can't do anything at this point.
                            console.log(
                                'Redirect has occurred but no query or hash parameters were found. ' +
                                'They were either not set during the redirect, or were removed before Satellizer ' +
                                'could read them, e.g. AngularJS routing mechanism.'
                            );
                        }

                        $interval.cancel(polling);
                        window_test.close();
                        resolve(qs);
                    }

                } catch (error) {
                    // console.log(error);
                }
            }, 20)


        });
    };

    self.getFullUrlPath = function(location) {
        var isHttps = location.protocol === 'https:';
        return location.protocol + '//' + location.hostname +
            ':' + (location.port || (isHttps ? '443' : '80')) +
            (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
    };

    self.parseQueryString = function(keyValue) {
        var obj = {},
            key, value;
        angular.forEach((keyValue || '').split('&'), function(keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
            }
        });
        return obj;
    };

    return self;
};

export default OauthFactory;