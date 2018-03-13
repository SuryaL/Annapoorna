class footerBtnCtrl {
    constructor($state) {
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

