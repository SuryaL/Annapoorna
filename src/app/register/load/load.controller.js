class loadController {
    constructor($state, $window) {
        'ngInject';
        this.$state = $state;
        this.$window = $window;
        this.bgLogo = require('./logo-login.png');
        
    }

    continue() {
        this.$state.go('app.chat.conversation');
    }
}

export default loadController;
