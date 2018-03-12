class voteCtrl {
    constructor($state, oauthService) {
        'ngInject';
        this.user = {};
        this.headTitle = 'Vote for this weeks dishes';
        this.subheadTitle = '8.8.88';
        this.voteItems=[
            1,2,3,4,5
        ]
        this.footerText = "Vote";
    }

    submit() {
    	console.log(this.user);
    	
    }
}

export default voteCtrl;

