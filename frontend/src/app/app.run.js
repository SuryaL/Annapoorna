export default function($state, $rootScope, $window) {
    'ngInject';
    // $state.go( 'app.home' )
    $rootScope.setUser = function(userInfo) {
        $window.localStorage.setItem('user', JSON.stringify(userInfo));
    };
    $rootScope.getUser = function() {
        let user = $window.localStorage.getItem('user') || '{}';
        return $rootScope.user = JSON.parse(user);
    }
    $rootScope.getUser();
}