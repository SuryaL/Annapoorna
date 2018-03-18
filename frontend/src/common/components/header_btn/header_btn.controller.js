class HeaderBtnController {
    constructor() {
        'ngInject';
        this.name = 'HeaderBtn';
    }
    submit() {
        this.callback && this.callback();
    }
}

export default HeaderBtnController;
