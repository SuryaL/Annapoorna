class footerBtnCtrl {
    constructor($state, oauthService) {
        'ngInject';
        this.user = {};
        console.log(this.footerText);
    }

    submit() {
        // console.log(this.user);
        this.action();
    	
    }
}

export default footerBtnCtrl;

