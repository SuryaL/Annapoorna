class OrdersController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter,OrderDetailsPopup) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter,OrderDetailsPopup });
        this.user = {};
        this.headTitle = 'Orders';
        this.subheadTitle = '.';
        this.btnText = "orders";
        this.init();
    }

    init() {
        this.$q.all([this.StatusService.findActiveWeek(), this.OrderService.getAllOrders()])
            .then(results => {
                this.weekDetails = results[0] || {};
                console.log()
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


    openOrderDetails = (week) =>{
        this.OrderService.getAllUsersOrdersWeekly(week)
        .then((res)=>{
            this.OrderDetailsPopup.open(res)
        })
        .catch(err => console.error(err))

    }

}

export default OrdersController;
