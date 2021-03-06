class voteCtrl {
    constructor($state, $auth, MenuService,VoteService,StatusService,$q,PaymentService, $filter,MenuVotingLimit, MyToastr) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            MenuService,
            StatusService,
            $q,
            MenuVotingLimit,
            PaymentService,
            MyToastr,
            $filter
        });
        this.menuTypes = ['Special', 'Regular'];

        this.selectedItems = new Set();
        this.VoteService = VoteService;
        this.StatusService = StatusService;
        this.menuItems=[];
        this.init();
    }

    init(){
        startloading;
        this.$q.all([this.StatusService.findActiveWeek()])
        .then(results => {
          let weekDetails = results[0]||{};
        //   let menuItems = results[1] || [];
            return this.$q.all([
                this.VoteService.find({week:weekDetails.week}),
                this.VoteService.getWeeksVotes({week:weekDetails.week}),
                this.VoteService.getMajority({week:weekDetails.week}),
                this.MenuService.find(),
                this.$q(resolve=>resolve(weekDetails))
            ])
        })
        .then(([currentWeekVotes,voteSummary, majority, menuItems, weekDetails])=> {

            this.weekDetails = weekDetails;
            this.menuItems.length=0;
            this.menuItems.push(...menuItems);
            this.currentWeek = this.weekDetails.week;
            this.voting_status = this.weekDetails.voting_status;
            this.vote_deadline = this.weekDetails.voting_deadline;
            this.menuItemsObj = this.menuItems.reduce((prev,curr)=>{
                prev[curr.id] = curr;
                return prev;
            },{})

            // console.log('voteSummary',voteSummary);
            this.majority = new Set(majority||[]);
            const currentWeekUserVote = (currentWeekVotes||[])[0]||{};
            const dishes_voted = currentWeekUserVote.dishes||[];
            const assures = currentWeekUserVote.assure||{};

            this.menuItems.forEach((menuitem)=>{
                let key = menuitem.id;
                if(assures[key]){
                    menuitem.quantity = +assures[key];
                }
                if(voteSummary[key]){
                    menuitem.voteSummary = voteSummary[key];
                }
            })

            this.already_voted = !!dishes_voted.length;
            (dishes_voted||[]).forEach(dish_id => this.selectedItems.add(dish_id));
            stoploading;
        })
        .catch(err =>{
            console.error(err);
            stoploading;
        })
        
    }

    get selectedItemsArr (){
        return [...this.selectedItems];
    }

    isMajority(id){
        return this.majority && this.majority.has(id);
    }

    get btnText(){
        return !!this.already_voted ? 'Re-Vote' : 'Vote';
    }

    get headTitle(){
        let d = '';
        if(this.currentWeek){
            d = this.$filter('date')(this.currentWeek,'MMM d');
        }
        return !d? '...' : d +' week\'s dishes';
    }

    get subheadTitle() {
        let d = '';
        if(this.vote_deadline){
            d = this.$filter('date')(this.vote_deadline,'EEE MMM d,  h:mm:ss a');
        }
        return !d? '...' :'Deadline : ' + d
    }

    get votedSize() {
        return this.selectedItems.size;
    }



    showSubmit(){
        // return true;
        return this.currentWeek && !this.timePassed && !this.voting_status
    }
    vItemClicked = (event) =>{
        if(!this.showSubmit()){
            event.stopPropagation();
            event.preventDefault();
            this.MyToastr.error(`Voting Disabled!`);
            return false;
        }
    }

    getAssures(){
        return this.menuItems.filter((item)=>{
            return +item.quantity
        }).reduce((prev, item)=>{
            if(!prev[item.id]) prev[item.id] = item.quantity.toString();
            return prev;
        },{})
    }

    voteSubmit = () => {
        if(!this.PaymentService.paymentIsCool()){
            return this.MyToastr.error('No access! Please settle up.')
        }
        if(this.timePassed){
            return this.MyToastr.error(`Time Expired!`);
        }
        if(!this.selectedItems || this.selectedItems.size < 1 || !this.currentWeek) {
            return this.MyToastr.error(`Select atleast 1`);
        };

        startloading;
        this.VoteService
            .create({dishes:this.selectedItems, assure:this.getAssures(), week:this.currentWeek})
            .then(resp => {
                this.MyToastr.success(`Vote Submitted`);
                this.init()
            })
            .catch(err=> {
                this.MyToastr.error(`Failed!`);
                console.log(err);
                stoploading;
            });
    }

    isSelectedItem = (id) => this.selectedItems.has(id);

    voteToggleZero = (id) => {
        this.voteToggle(id)
        if(!this.isSelectedItem(id)){
            let found = this.menuItems.find(item => item.id == id);
            if(found){
                found.quantity = 0;
            }
        }
    }

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