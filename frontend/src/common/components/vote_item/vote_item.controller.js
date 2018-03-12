class voteCtrl {
    constructor($state, $auth) {
        'ngInject';
        this.user = {};
    }

    submit() {
    	console.log(this.user);
    	
    }
}

export default voteCtrl;

