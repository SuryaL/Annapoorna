class PaymentController {
    constructor(PaymentService, OrderService, $q) {
        'ngInject';
        this.$q = $q;
        this.OrderService = OrderService;
        this.PaymentService = PaymentService;
        this.name = 'Payment';
        this.headTitle = 'Payment';
        this.subheadTitle = '.';
        this.payments = [];
        this.myorders = [];
        this.init();
    }

    init() {
        startloading;
        this.$q.all([this.OrderService.getMyOrders()])
            .then(([myorders]) => {
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
