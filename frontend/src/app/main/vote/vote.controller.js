class voteCtrl {
    constructor($state, oauthService) {
        'ngInject';
        this.user = {};
        this.voteItems=[
            1,2,3,4,5
        ]
    }

    submit() {
    	console.log(this.user);
    	
    }
}

export default voteCtrl;

