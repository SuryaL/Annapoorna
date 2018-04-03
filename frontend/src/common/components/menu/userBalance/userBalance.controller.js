class footerBtnCtrl {
    constructor($state, PaymentService, $scope, $auth) {
        'ngInject';
        this.PaymentService = PaymentService;
        this.$scope         = $scope;
        this.user = $auth.getUser();
    }
    
    init(){
        if(this.user.type.indexOf('user') != -1){
            this.PaymentService.getUserBalance().then(resp => {
                this.userPayment = resp;
            })
        }else if(this.user.type.indexOf('cook') != -1){
            this.PaymentService.getCookBalance().then(resp => {
                this.userPayment = resp;
            })
        }
    }
    
    $onInit(){
        this.init();
        this.$scope.$on('pay-update', ()=> this.init())
    }

    get owesText(){
        if(this.owes == 0){
            return 'settled up'
        }
        return this.owes > 0 ? 'owes' : 'overpaid'
    }

    get owes(){
        if(!this.userPayment || !this.userPayment.payments){
            return 0
        }
        
        return +this.userPayment.orders_bill - +this.userPayment.payments.total
    }
}

export default footerBtnCtrl;

