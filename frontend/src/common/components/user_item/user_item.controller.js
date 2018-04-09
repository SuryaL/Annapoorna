class UserItemController {
    constructor($auth) {
        'ngInject';
        this.name = 'UserItem';
        this.limit = 3;
        this.increaseBy = 10;
        this.user = $auth.getUser();
        this.texts          = {
            user:{
                minus:'owes',
                plus:'overpaid',
                zero:'settled up'
            },
            cook:{
                minus:'owes',
                plus:'gets back',
                zero:'settled up'
            }
        }
        this.defaultPic = require('assets/images/blank_profile.png');
    }


    $onInit(){
        this.payAmount = '0.00';
    }

    get username(){
        if(!this.item){
            return 'noname'
        }

        if(this.item.first_name){
            return this.item.first_name
        }else if(this.item.last_name){
            return this.item.last_name
        }else if(this.item.email){
            return this.item.email
        }
        return 'noname'
    }

  owesText(has_type){
        let text = this.texts[has_type]
        if(this.owes == 0){
            return text.zero;
        }
        return this.owes > 0 ? text.minus : text.plus
    }

    get owes(){
        if(!this.item || !this.item.payments){
            return 0
        }
        
        return +this.item.orders_bill - +this.item.payments.total
    }

    get payment_history(){
        if(!this.item || !this.item.payments) return [];
        return this.item.payments.payment_history
    }

    status(item){
        // console.log(item);
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
