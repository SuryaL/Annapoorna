class HistoryItemController {
    constructor() {
        'ngInject';
        this.name = 'HistoryItem';
    }
    orderDetails = (week) => {
        this.individualOrderDetails(week);
    }
}

export default HistoryItemController;
