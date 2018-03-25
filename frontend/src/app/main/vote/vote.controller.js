class voteCtrl {
    constructor($state, $auth, MenuService,VoteService,StatusService,$q,MenuVotingLimit, MyToastr) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            MenuService,
            StatusService,
            $q,
            MenuVotingLimit,
            MyToastr
        });
        this.headTitle = 'Vote for this week\'s dishes';
        this.menuTypes = ['special', 'regular'];
        this.btnText = "Vote";

        this.selectedItems = new Set();
        this.vote_deadline = '03-19-2018';
        this.VoteService = VoteService;
        this.StatusService = StatusService;
        this.init();
    }

    init(){
        this.$q.all([this.MenuService.find(), this.StatusService.findActiveWeek()])
        .then(results => {
            this.menuItems = results[0] || [];
            this.weekDetails = results[1];
            this.currentWeek = this.weekDetails.week;
            return this.VoteService.find({week:this.weekDetails.week})
        })
        .then((currentWeekVotes)=> {
            const dishes_voted = (currentWeekVotes||[])[0].dishes;
            (dishes_voted||[]).forEach(dish_id => this.selectedItems.add(dish_id));
        })
        .catch(console.error)
    }

    get subheadTitle() {
        return 'Deadline : ' + this.vote_deadline.replace(/-/g, '.')
    }

    get votedSize() {
        return this.selectedItems.size;
    }
    
    voteSubmit = () => {
        if(!this.selectedItems || this.selectedItems.size < 1) return ;
        this.VoteService
        .create({dishes:this.selectedItems, week:this.currentWeek})
        .then(resp => {
            this.MyToastr.success(`Vote Submitted`);
            console.log(resp);
        })
        .catch(err=> {
            this.MyToastr.error(`Failed!`);
            console.log(err);
        });
    }

    isSelectedItem = (id) => this.selectedItems.has(id);
    voteToggle = (id) => {
        if(this.isSelectedItem(id)){
            this.selectedItems.delete(id);
        }else{
            if(this.votedSize >= this.MenuVotingLimit ){
                this.MyToastr.error(`Select upto ${this.MenuVotingLimit} only`);
                return
            }
            this.selectedItems.add(id);
        } 
    }
}

export default voteCtrl;