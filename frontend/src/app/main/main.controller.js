class homeCtrl {
    constructor($state, oauthService) {
        'ngInject';
        Object.assign(this, { $state, oauthService });
        this.user = {};
    }

    submit() {
    	console.log(this.user);
    	this.oauthService.open()
    		.then(resp => {
    			console.log("fb resp", resp);
    		})
    		.catch(err => console.log("fb err", err));
    }
}

export default homeCtrl;

