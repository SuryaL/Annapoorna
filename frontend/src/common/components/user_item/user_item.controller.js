class UserItemController {
    constructor() {
        'ngInject';
        this.name = 'UserItem';
        this.limit = 3;
        this.increaseBy = 10;
        this.pay_amount = '0.00';
    }
    status(item){
        console.log(item);
        if(!item || (!item.week_voted && !item.week_ordered)){
            return false;
        }

        if(item.week_ordered ){
            return 'ordered'
        }else{
            return 'voted'
        }
    }

    showMoreClicked(){
        this.limit += this.increaseBy;
    }

    shouldShowMore(arr,limit){
        if(!arr || !arr.length){
            return false
        }

        return limit < arr.length;
    }

}

export default UserItemController;
