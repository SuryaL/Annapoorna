class HistoryController {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService });
        this.user = {};
        this.headTitle = 'History';
        this.subheadTitle = '-';
       
        this.footerText = "history";

    }

    
}

export default HistoryController;