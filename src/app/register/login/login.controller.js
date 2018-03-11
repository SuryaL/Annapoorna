class loginController {
    constructor($state, $http, $rootScope) {
        'ngInject';

        this.$state = $state;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.user = {
            privatekey: '',
            password: ''
        };
        // this.bgLogo = '';
        this.bgLogo = require('./logo-login.png');
    }

    $onInit() {
        let pk = this.$rootScope.getUser().private_key;
        if(pk != undefined || pk != ''){
            this.user.privatekey = pk;
        }
    }

    login() {
        let self = this;
        this.$http({
            method: 'POST',
            url: this.$rootScope.baseURL + '/login',
            data: {
                privatekey: this.user.privatekey,
                password: this.user.password
            }
        })
        .then(function (data) {
            console.log(data);
            if(data.status == 200)
                self.$state.go('register.load')
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    
    signup() {
        this.$state.go('register.signup');
    }

    load() {
        this.$state.go('register.load');
    }
}

export default loginController;