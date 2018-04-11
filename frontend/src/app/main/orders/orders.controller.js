class OrdersController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, OrderDetailsPopup) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, OrderDetailsPopup });
        this.headTitle = 'Orders';
        this.subheadTitle = '.';
        this.btnText = "orders";
        let user = this.$auth.getUser();
        this.init();
    }

    init() {
        startloading;
        this.$q.all([this.StatusService.findActiveWeek(), this.OrderService.getAllOrders()])
            .then(results => {
                this.weekDetails = results[0] || {};
                console.log()
                this.currentWeek = this.weekDetails.week;
                this.voting_status = this.weekDetails.voting_status;
                this.order_status = this.weekDetails.order_status;
                this.order_deadline = this.weekDetails.order_deadline;
                this.vote_deadline = this.weekDetails.voting_deadline;
                this.myorders = results[1].reverse() || [];
                console.log(results[1]);
                stoploading;
            })
            .catch(error => {
                console.error(error);
                stoploading;
            })
    }

    isAdmin() {
        return user && user.type.indexOf('admin') != -1
    }
    
    openOrderDetails = (week) => {
        if(!this.isAdmin) {
            return;
        }
        startloading;
        this.OrderService.getAllUsersOrdersWeekly({week: week})
            .then((res) => {
                console.log('the result is ', res);
                this.OrderDetailsPopup.open(res);
                stoploading;

            })
            .catch(error => {
                console.error(error);
                stoploading;
            })

    }

}

export default OrdersController;