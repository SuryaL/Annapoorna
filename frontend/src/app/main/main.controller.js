class mainController {
    constructor($state, $auth) {
        'ngInject';
        Object.assign(this, { $state, $auth });
        this.user = this.$auth.getUser();
    }
}

export default mainController;

