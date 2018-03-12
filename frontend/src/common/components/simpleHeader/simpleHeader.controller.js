class voteCtrl {
    constructor($state, oauthService) {
        'ngInject';
        this.user = {};
    }

    submit() {
    	console.log(this.user);
    	
    }
}

export default voteCtrl;

