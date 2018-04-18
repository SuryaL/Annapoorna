class UserItemController {
    constructor($auth, $rootScope, UserService, PaymentService, MyToastr) {
        'ngInject';
        this.name = 'UserItem';
        this.limit = 3;
        this.increaseBy = 10;
        this.user = $auth.getUser();
        this.$rootScope = $rootScope;
        this.UserService = UserService;
        this.MyToastr = MyToastr;
        this.PaymentService = PaymentService;

        this.texts = {
            user: {
                minus: 'owes',
                plus: 'overpaid',
                zero: 'settled up'
            },
            cook: {
                minus: 'owes',
                plus: 'gets back',
                zero: 'settled up'
            }
        }
        this.defaultPic = require('assets/images/blank_profile.png');
    }


    $onInit() {
        this.payAmount = '0.00';
    }

    get username() {
        if(!this.item) {
            return 'noname'
        }

        if(this.item.first_name) {
            return this.item.first_name
        } else if(this.item.last_name) {
            return this.item.last_name
        } else if(this.item.email) {
            return this.item.email
        }
        return 'noname'
    }

    getStatus(status) {
        if(!status) {
            return 'pending';
        }
        return status
    }
    
    shouldShow(type, status_received){
        const status = this.getStatus(status_received);
        switch(type){
            case 'accept':{
                if(status=='pending'){
                    return true;
                }
                break;
            };
            case 'reject':{
                if(status=='pending'){
                    return true;
                }
                break;
            };
            case 'delete':{
                if(status!='deleted'){
                    return true;
                }
                break;
            };
            case 'undo':{
                if(status!='pending'){
                    return true;
                }
                break;
            };
        }
        return false;
    }


    updatePayment(type, payment){
        let {week} = payment;
        let user = this.item.id;
        let status;
        switch(type){
            case 'accept':{
                    status = 'accepted';
                break;
            };
            case 'reject':{
                    status = 'rejected';
                break;
            };
            case 'delete':{
                    status = 'deleted';
                break;
            };
            case 'undo':{
                    status = 'pending';
                break;
            };

        }

        if(status && user && user){
            startloading;
            this.PaymentService.updateUserPayment({status, week, user})
            .then(()=>{
                this.$rootScope.$broadcast('pay-update');
                this.init && this.init();
            }).catch((err)=>{
                stoploading;
                this.MyToastr.error('Failed')
                console.error(err)
            })
        }

    }

    owesText(has_type) {
        let text = this.texts[has_type]
        if(this.owes == 0) {
            return text.zero;
        }
        return this.owes > 0 ? text.minus : text.plus
    }

    get owes() {
        if(!this.item || !this.item.payments) {
            return 0
        }

        return +this.item.orders_bill - +this.item.payments.total
    }

    get payment_history() {
        if(!this.item || !this.item.payments) return [];
        return this.item.payments.payment_history
    }

    status(item) {
        // console.log(item);
        if(!item || (!item.week_voted && !item.week_ordered)) {
            return false;
        }

        if(item.week_ordered) {
            return 'ordered'
        } else {
            return 'voted'
        }
    }

    showMoreClicked() {
        this.limit += this.increaseBy;
    }

    shouldShowMore(arr, limit) {
        if(!arr || !arr.length) {
            return false
        }

        return limit < arr.length;
    }

}

export default UserItemController;