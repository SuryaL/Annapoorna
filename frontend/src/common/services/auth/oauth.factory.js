let OauthFactory = function($http, $q, $window, $interval, $timeout) {
    'ngInject';

    let self = this;
    let defaults = {
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.12/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email', 'public_profile', 'user_about_me'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 },
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        clientId: '1653283634989097',
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    };

    self.open = function(options, userData, customOptions) {
        // defaults = OauthUtils.merge(options, defaults);
        // defaults = OauthUtils.merge(customOptions, defaults);
        return $q(function(resolve, reject) {

            $timeout(function() {
                var url;
                var openPopup;
                url = [defaults.authorizationEndpoint, self.buildQueryString()].join('?');
                openPopup = self.popupHandle(url, defaults.name, defaults.popupOptions, defaults.redirectUri)

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

                        // resolve(oauthData);
                        var data = angular.extend({}, userData);

                        angular.forEach(defaults.responseParams, function(value, key) {
                            switch (key) {
                                case 'code':
                                    data[value] = oauthData.code;
                                    break;
                                case 'clientId':
                                    data[value] = defaults.clientId;
                                    break;
                                case 'redirectUri':
                                    data[value] = defaults.redirectUri;
                                    break;
                                default:
                                    data[value] = oauthData[key];
                            }
                        });

                        if (oauthData.state) {
                            data.state = oauthData.state;
                        }
                        let exchangeForTokenUrl = ENV.API_URL + defaults.url;
                        return $http.post(exchangeForTokenUrl, data)
                            .then(resolve)
                            .catch(reject)
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
                var camelizedName = self.camelCase(paramName);
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

    self.popupHandle = function(url, name, options) {
        return $q(function(resolve, reject) {
            var redirectUriParser = document.createElement('a');
            redirectUriParser.href = window.location.origin + '/';
            var redirectUriPath = self.getFullUrlPath(redirectUriParser);

            var window_test = $window.open(url, '_blank', "width=950,height=780");
            $window.popup = window_test;
            var polling = $interval(function() {
                if (!window_test || window_test.closed || window_test.closed == undefined) {
                    $interval.cancel(polling);
                    resolve(false);
                }
                try {
                    var popupWindowPath = self.getFullUrlPath(window_test.location);
                    // console.log(redirectUriPath, popupWindowPath);
                    if (popupWindowPath === redirectUriPath) {
                        // Contains query/hash parameters as expected.
                        if (window_test.location.search || window_test.location.hash) {
                            var queryParams = window_test.location.search.substring(1).replace(/\/$/, '');
                            var hashParams = window_test.location.hash.substring(1).replace(/[\/$]/, '');
                            var hash = self.parseQueryString(hashParams);
                            var qs = self.parseQueryString(queryParams);

                            angular.extend(qs, hash);

                            if (qs.error) {
                                console.log("FB popup error:", qs);

                            } else {
                                console.log(qs);
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
                        $timeout(() => {
                            window_test.close();
                        }, 500);
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

    self.camelCase = function(name) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        });
    };

    return self;
};

export default OauthFactory;