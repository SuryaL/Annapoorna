class loginCtrl {
    constructor($state, OauthService, $auth) {
        'ngInject';
        Object.assign(this, { $state, OauthService, $auth });
        this.user = {};
        this.$state = $state;
    }

    submit() {
        this.OauthService.open()
            .then(resp => {
                console.log("fb resp", resp.data);
                this.$auth.setToken(resp.data.token);
                this.$state.go('app.main.vote');
            })
            .catch(err => console.log("fb err", err));
    }
}

export default loginCtrl;

