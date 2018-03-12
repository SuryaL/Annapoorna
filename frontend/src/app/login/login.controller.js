class loginCtrl {
    constructor($state, oauthService) {
        'ngInject';
        Object.assign(this, { $state, oauthService });
        this.user = {};
        this.$state = $state;
    }

    submit() {
    	console.log(this.user);
    	this.oauthService.open()
    		.then(resp => {
                console.log("fb resp", resp);
                this.$state.go('app.home');
                
    		})
    		.catch(err => console.log("fb err", err));
    }
}

export default loginCtrl;

