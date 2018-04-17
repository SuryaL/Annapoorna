class VoteHistoryItemController {
    constructor(VoteService) {
        'ngInject';
        this.name = 'VoteHistoryItem';
        this.VoteService = VoteService;
        this.majorItems = [];
    }

    $onInit(){
        this.VoteService.getMajority({week:this.item.week})
        .then((resp)=>{
            this.majorItems.length = 0;
            this.majorItems = resp
        })
    }

    sortItem(item) {
        return item.vote + item.assure;
    }

    dishIsInMajority = (dishId) => {
        return ((this.majorItems||[]).indexOf(dishId) != -1)
   }

}

export default VoteHistoryItemController;
