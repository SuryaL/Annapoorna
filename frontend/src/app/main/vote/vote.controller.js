class voteCtrl {
    constructor($state, $auth) {
        'ngInject';
        Object.assign(this, { $state, $auth });
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

    logout() {
        this.$auth.logout();
    }
}

export default voteCtrl;

