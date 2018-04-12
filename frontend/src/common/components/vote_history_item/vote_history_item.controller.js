class VoteHistoryItemController {
    constructor() {
        'ngInject';
        this.name = 'VoteHistoryItem';
        
    }
    $onInit(){
      
    }
    getDishName = (id) =>{
        return this.menu[id]
    }

}

export default VoteHistoryItemController;
