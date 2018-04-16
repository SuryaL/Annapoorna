class VoteHistoryItemController {
    constructor() {
        'ngInject';
        this.name = 'VoteHistoryItem';
        
    }
    $onInit(){
      
    }

    sortItem(item) {
        return item.vote + item.assure;
    }

}

export default VoteHistoryItemController;
