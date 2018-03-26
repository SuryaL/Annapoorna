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

        this.selectedItems = new Set();
        // this.vote_deadline = '03-19-2018';
        this.VoteService = VoteService;
        this.StatusService = StatusService;
        this.init();
    }

    init(){
        this.$q.all([this.StatusService.findActiveWeek(), this.MenuService.find()])
        .then(results => {
            this.weekDetails = results[0]||{};
            this.currentWeek = this.weekDetails.week;
            this.voting_status = this.weekDetails.voting_status;
            this.vote_deadline = this.weekDetails.voting_deadline;
            this.menuItems = results[1] || [];
            
            return this.$q.all([
                this.VoteService.find({week:this.weekDetails.week}),
                // this.$q(resolve=>resolve(['39813b97-4b16-434b-bcf5-e9080e7565f8']))
                //TODO: Add Voting results api 
                // majority is current top dishes
                this.VoteService.getMajority({week:this.weekDetails.week}),
            ])
        })
        .then(([currentWeekVotes, majority])=> {
            this.majority = new Set(majority||[]);
            const currentWeekUserVote = (currentWeekVotes||[])[0]||{};
            const dishes_voted = currentWeekUserVote.dishes||[];
            this.already_voted = !!dishes_voted.length;
            (dishes_voted||[]).forEach(dish_id => this.selectedItems.add(dish_id));
        })
        .catch(console.error)
    }

    isMajority(id){
        return this.majority && this.majority.has(id);
    }

    get btnText(){
        return !!this.already_voted ? 'Re-Vote' : 'Vote';
    }

    get subheadTitle() {
        let d = '';
        if(this.vote_deadline){
            d = new Date(this.vote_deadline).toLocaleString().split('T')[0]
        }
        return 'Deadline : ' + d
    }

    get votedSize() {
        return this.selectedItems.size;
    }

    showSubmit(){
        return this.currentWeek && !this.timePassed && !this.voting_status
    }
    
    voteSubmit = () => {
        if(this.timePassed){
            return this.MyToastr.error(`Time Expired!`);
        }
        if(!this.selectedItems || this.selectedItems.size < 1 || !this.currentWeek) {
            return this.MyToastr.error(`Select atleast 1`);
        };
        this.VoteService
            .create({dishes:this.selectedItems, week:this.currentWeek})
            .then(resp => {
                this.MyToastr.success(`Vote Submitted`);
                this.init()
            })
            .catch(err=> {
                this.MyToastr.error(`Failed!`);
                console.log(err);
            });
    }

    isSelectedItem = (id) => this.selectedItems.has(id);
    voteToggle = (id) => {
        if(this.timePassed){
            return this.MyToastr.error(`Voting closed`);
        }

        if(this.isSelectedItem(id)){
            this.selectedItems.delete(id);
        }else{
            if(this.votedSize >= this.MenuVotingLimit ){
                return this.MyToastr.error(`Select upto ${this.MenuVotingLimit} only`);
            }
            this.selectedItems.add(id);
        } 
    }
}

export default voteCtrl;