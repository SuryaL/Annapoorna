class footerBtnCtrl {
    constructor($state) {
        'ngInject';
    }

    submit() {
        this.callback && this.callback();
    }
}

export default footerBtnCtrl;

