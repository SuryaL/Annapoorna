class homeCtrl {
    constructor($state, oauthService, $auth) {
        'ngInject';
        Object.assign(this, { $state, oauthService, $auth });
        this.user = {};
    }

    submit() {
    	console.log(this.user);
    	this.oauthService.open()
    		.then(resp => {
    			console.log("fb resp", resp.data);
                this.$auth.setToken(resp.data.token);
                this.user = this.$auth.getUser();
                this.$state.go('app.main.vote');
    		})
    		.catch(err => console.log("fb err", err));
    }
}

export default homeCtrl;

