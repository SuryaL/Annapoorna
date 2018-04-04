class loginCtrl {
    constructor($state, OauthService, $auth, MyToastr, $timeout) {
        'ngInject';
        Object.assign(this, { $state, OauthService, $auth, MyToastr, $timeout });
        this.user = {};
        this.$state = $state;
    }

    submit() {
        this.OauthService.open()
            .then(resp => {
                console.log("fb resp", resp.data);
                this.$auth.setToken(resp.data.token);
                this.$timeout(()=>{
                    this.$state.go('app.main.vote');
                },200)
            })
            .catch(err => {
                this.MyToastr.error('No access')
                console.error("fb err", err);
            });
    }
}

export default loginCtrl;

