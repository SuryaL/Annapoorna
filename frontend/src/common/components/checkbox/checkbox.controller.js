class checkboxCtrl {
    constructor($state) {
        'ngInject';
        this.isChecked = false;
    }

    toggle() {
        console.log(this.user);
        this.isChecked = !this.isChecked
    }
}

export default checkboxCtrl;

