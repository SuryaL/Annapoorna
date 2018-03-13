import angular from 'angular';

export default function($state, $rootScope, $window, $auth) {
    'ngInject';

    // 'none', 'both', 'authenticated'
    function States(event, toState, toParams, fromState, fromParams) {
        var authenticated = $auth.isAuthenticated();
        if (!authenticated && toState.authenticated === 'authenticated') {
            !!event.preventDefault && event.preventDefault();
            $auth.logout();
            $state.go('app.login');
        } else if (authenticated) {
            $auth.exchange();
            if (toState.authenticated === 'none') {
                !!event.preventDefault && event.preventDefault();
                $state.go('app.main.vote');
            }
        }
    }
    $rootScope.$on('$stateChangeStart', States);
    $rootScope.$on('oauth.errlogout', function(e) {
        $auth.logout();
    })
    // Trigger states function on page load
    angular.element(document).ready(function () {
      States ({}, $state.current, $state.params, {}, {});
    });
}