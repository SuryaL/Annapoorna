class checkboxCtrl {
    constructor($state) {
        'ngInject';
    }
    
    $onInit () {
    }

    toggle() {
        this.toggleVar = !this.toggleVar
    }
}

export default checkboxCtrl;

