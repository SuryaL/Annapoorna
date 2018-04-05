class PillController {
    constructor() {
        'ngInject';
        this.name = 'Pill';
    }
    close(){
        this.callback && this.callback();
    }
}

export default PillController;
