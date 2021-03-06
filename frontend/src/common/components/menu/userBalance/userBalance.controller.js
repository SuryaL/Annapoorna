class userBalanceCtrl {
    constructor($state, PaymentService, $scope, $auth) {
        'ngInject';
        this.PaymentService = PaymentService;
        this.$scope         = $scope;
        this.$state         = $state;
        this.user           = $auth.getUser();
        this.texts          = {
            user:{
                minus:'owe',
                plus:'overpaid',
                zero:'settled up'
            },
            cook:{
                minus:'owe',
                plus:'get back',
                zero:'settled up'
            }
        }
    }
    
    init(){
        this.PaymentService.recalculatePaymentUser(this.user);
    }

    isCurrentState = (state) => this.$state.current.name == state
    

    get usertype(){
        return this.PaymentService.payment_user_type(this.user);
    }

    $onInit(){
        this.init();
        this.$scope.$on('pay-update', ()=> this.init())
    }

    get owesText(){
        if(!this.usertype){
            return
        }
        let text = this.texts[this.usertype]
        if(this.owes == 0){
            return text.zero;
        }
        return this.owes > 0 ? text.minus : text.plus
    }

    get owes(){
        return +this.PaymentService.owes()
    }
}

export default userBalanceCtrl;

