class HistoryController {
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
        startloading;
        this.$q.all([this.StatusService.findActiveWeek(), this.OrderService.getMyOrders()])
            .then(results => {
                this.weekDetails = results[0] || {};
                this.currentWeek = this.weekDetails.week;
                this.voting_status = this.weekDetails.voting_status;
                this.order_status = this.weekDetails.order_status;
                this.order_deadline = this.weekDetails.order_deadline;
                this.vote_deadline = this.weekDetails.voting_deadline;
                this.myorders = results[1] || [];
                console.log('the results are : ', results[1].reverse());
                stoploading;
            })
            .catch(error => {
                console.error(error);
                stoploading;
            })
    }



}

export default HistoryController;