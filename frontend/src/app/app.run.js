import angular from 'angular';

export default function($state, $rootScope, $window, $auth) {
    'ngInject';

    // 'none', 'both', 'authenticated'
    function States(event, toState, toParams, fromState, fromParams) {
        console.log(event, toState, toParams, fromState, fromParams);
        var authenticated = $auth.isAuthenticated();
        if (!authenticated && toState.authenticated === 'authenticated') {
            !!event.preventDefault && event.preventDefault();
            $auth.logout();
            $state.go('app.login');
        } else if (authenticated) {
            $auth.exchange();
            if (toState.authenticated === 'none') {
                !!event.preventDefault && event.preventDefault();
                if((this.$auth.getUser().type || []).includes('user')){
                    $state.go('app.main.vote');
                }else if((this.$auth.getUser().type || []).includes('cook')){
                    $state.go('app.main.orders');
                }else{
                    $state.go('app.main.profile');
                }
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