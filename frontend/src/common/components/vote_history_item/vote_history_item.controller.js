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

    dishIsInMajority = (dishId) => {
        return ((this.majorItems||[]).indexOf(dishId) != -1)
   }

}

export default VoteHistoryItemController;
