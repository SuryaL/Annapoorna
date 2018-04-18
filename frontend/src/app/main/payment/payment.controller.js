class PaymentController {
    constructor(PaymentService, OrderService, $q, $auth) {
        'ngInject';
        this.$q             = $q;
        this.user           = $auth.getUser();
        this.OrderService   = OrderService;
        this.PaymentService = PaymentService;
        this.name           = 'Payment';
        this.headTitle      = 'Payment';
        this.subheadTitle   = '.';
        this.payments       = [];
        this.myorders       = [];
        this.init();
    }

    init() {
        startloading;
        this.$q.all([this.PaymentService.recalculatePaymentUser(this.user),this.OrderService.getMyOrders()])
            .then(([mypayments, myorders]) => {
                console.log(mypayments, myorders);
                this.payments = mypayments || [];
                this.myorders = myorders || [];
                // console.log('the results are : ', results[1].reverse());
                stoploading;
            })
            .catch(error => {
                console.error(error);
                stoploading;
            })
    }
}

export default PaymentController;
