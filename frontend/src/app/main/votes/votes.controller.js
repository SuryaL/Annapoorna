
class VotesController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, VoteDetailsPopup) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, VoteDetailsPopup });
        this.headTitle = 'Votes';
        this.subheadTitle = '.';
        this.btnText = "votes";
        this.majorityItems = [];
        let user = this.$auth.getUser();
        this.init();
    }

    init() {
        startloading;
        this.VoteService.getAllVotes()
            .then(myvotes => {
                this.myvotes = myvotes || [];
               
                // this.menuList = results[1].menuObj || {};
                // this.usersList = results[1].usersObj || {};
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
    openVoteDetails = (vItem) => {
        if(!this.isAdmin) {
            return;
        }
        this.VoteDetailsPopup.open(vItem);
    }
    

}

export default VotesController;
