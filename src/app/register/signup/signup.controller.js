class signupController {
    constructor($state, $rootScope, $http, $window) {
        'ngInject';

        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.bgLogo = require('./logo-login.png');
    }
    
    signup() {
        let self = this;
        console.log("signup");
        this.$http({
            method: 'POST',
            url: this.$rootScope.baseURL + '/register',
            data: {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            }
        })
        .then(function (data) {
            console.log(data);
            data.data["email"] = self.user.email;
            self.$rootScope.setUser(data.data);
            self.$state.go('register.load');
        })
        .catch(function (err) {
            console.log(err);
        })
    }

    load() {
        this.$state.go('register.load');
    }
}

export default signupController;