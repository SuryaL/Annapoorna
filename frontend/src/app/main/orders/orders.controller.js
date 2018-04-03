class OrdersController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter });
        this.user = {};
        this.headTitle = 'History';
        this.subheadTitle = '.';
        this.btnText = "history";
        this.init();
    }

    init() {
        this.$q.all([this.StatusService.findActiveWeek(), this.OrderService.getAllOrders()])
            .then(results => {
                this.weekDetails = results[0] || {};
                this.currentWeek = this.weekDetails.week;
                this.voting_status = this.weekDetails.voting_status;
                this.order_status = this.weekDetails.order_status;
                this.order_deadline = this.weekDetails.order_deadline;
                this.vote_deadline = this.weekDetails.voting_deadline;
                this.myorders = results[1] || [];
                console.log(results[1]);
            })
            .catch(console.error)
    }

}

export default OrdersController;
