class PaymentController {
    constructor(PaymentService, OrderService, $q, $auth, MyToastr) {
        'ngInject';
        this.$q = $q;
        this.user = $auth.getUser();
        this.OrderService = OrderService;
        this.PaymentService = PaymentService;
        this.name = 'Payment';
        this.headTitle = 'Payment';
        this.subheadTitle = '.';
        this.payments = [];
        this.myorders = [];
        this.btnText = 'Add Pay';
        this.resetPayAmount();
        this.MyToastr = MyToastr;
        this.init();
    }

    init() {
        startloading;
        this.$q.all([this.PaymentService.recalculatePaymentUser(this.user), this.OrderService.getMyOrders()])
            .then(([mypayments, myorders]) => {
                console.log(mypayments, myorders);
                this.payments = mypayments ? mypayments.payments : [];
                this.myorders = myorders || [];
                // console.log('the results are : ', results[1].reverse());
                stoploading;
            })
            .catch(error => {
                console.error(error);
                stoploading;
            })
    }

    resetPayAmount(){
        this.payAmount = '0.00';
    }

    get payment_history() {
        if(!this.payments) return [];
        return this.payments.payment_history
    }

    getStatus(status) {
        if(!status) {
            return 'pending';
        }
        return status
    }


    showSubmit() {
        return +this.payAmount != 0;
    }

    paySubmit = () => {
        //handle click once 
        if(!!this.payclicked) {
            return;
        }
        this.payclicked = true;
        if(this.showSubmit()) {
            startloading;
            this.PaymentService.addPaymentUser({ pay_amount: +this.payAmount }).then(() => {
                this.payclicked = false;
                this.init();
                this.resetPayAmount();
            }).catch((err) => {
                this.payclicked = false;
                stoploading;
                this.MyToastr.error('Failed')
                console.error(err);
            })
        }
    }
}

export default PaymentController;