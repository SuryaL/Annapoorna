
class VotesController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, VoteDetailsPopup) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, VoteDetailsPopup });
        this.headTitle = 'Votes';
        this.subheadTitle = '.';
        this.btnText = "votes";
        let user = this.$auth.getUser();
        this.init();
    }

    init() {
        
        startloading;
        this.$q.all([this.StatusService.findActiveWeek(), this.VoteService.getAllVotes()])
            .then(results => {
                this.weekDetails = results[0] || {};
                console.log()
                this.currentWeek = this.weekDetails.week;
                this.voting_status = this.weekDetails.voting_status;
                this.order_status = this.weekDetails.order_status;
                this.order_deadline = this.weekDetails.order_deadline;
                this.vote_deadline = this.weekDetails.voting_deadline;
                this.myvotes = results[1].totalVotes || [];
                this.menuList = results[1].menuObj || {};
                this.usersList = results[1].usersObj || {};
                // console.log(results[1]);
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
    sortItem(item) {
        var date = new Date(item.week);
        return date;
    }
    openVoteDetails = (week) => {
        if(!this.isAdmin) {
            return;
        }
        startloading;
        // console.log(this.VoteService.getAllUsersVotingsWeekly);
        this.VoteService.getAllUsersVotingsWeekly({week: week})
            .then((res) => {
                // console.log('the result is ', res);
                this.VoteDetailsPopup.open(res);
                stoploading;

            })
            .catch(error => {
                console.error(error);
                stoploading;
            })

    }

}

export default VotesController;
