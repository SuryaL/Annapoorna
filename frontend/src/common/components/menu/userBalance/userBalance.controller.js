class footerBtnCtrl {
    constructor($state, PaymentService, $scope, $auth) {
        'ngInject';
        this.PaymentService = PaymentService;
        this.$scope         = $scope;
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
        console.log('balance here');
        if(this.usertype == 'user'){
            this.getUserBalance();
        }else if(this.usertype == 'cook'){
          this.getCookBalance();
        }
    }

    getCookBalance(){
        this.PaymentService.getCookBalance().then(resp => {
            this.userPayment = resp;
        })
    }

    getUserBalance(){
        this.PaymentService.getUserBalance().then(resp => {
            this.userPayment = resp;
        })
    }
    
    get usertype(){
        if(!this.user){
            return '';
        }
        return (this.user.type||[]).indexOf('user') != -1 ? 'user': ((this.user.type||[]).indexOf('cook') != -1 ? 'cook' : '');
    }

    $onInit(){
        this.init();
        this.$scope.$on('pay-update', ()=> this.init())
    }

    get owesText(){
        let text = this.texts[this.usertype]
        if(this.owes == 0){
            return text.zero;
        }
        return this.owes > 0 ? text.minus : text.plus
    }

    get owes(){
        if(!this.userPayment || !this.userPayment.payments){
            return 0
        }
        
        return +this.userPayment.orders_bill - +this.userPayment.payments.total
    }
}

export default footerBtnCtrl;

