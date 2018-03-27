class OrderController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr });
        this.user = {};
        this.headTitle = 'Order this week\'s dishes';

        this.orderItems = [];
        this.btnText = "order";
        // this.getVotedItems();
        // this.order_deadline = '03-20-2018';
        this.init();
    }

    init() {
        this.$q.all([this.StatusService.findActiveWeek(), this.MenuService.find()])
            .then(results => {
                this.weekDetails = results[0] || {};
                this.currentWeek = this.weekDetails.week;
                this.voting_status = this.weekDetails.voting_status;
                this.order_status = this.weekDetails.order_status;
                this.order_deadline = this.weekDetails.order_deadline;
                this.vote_deadline = this.weekDetails.voting_deadline;
                this.menuItems = results[1] || [];
                return this.$q.all([
                this.VoteService.find({ week: this.weekDetails.week }),
                // this.$q(resolve=>resolve(['39813b97-4b16-434b-bcf5-e9080e7565f8']))
                //TODO: Add Voting results api 
                // majority is current top dishes
                this.VoteService.getMajority({ week: this.weekDetails.week }),
            ])
            })
            .then(([currentWeekVotes, majority]) => {
                this.majority = new Set(majority || []);
                const currentWeekUserVote = (currentWeekVotes || [])[0] || {};
                const dishes_voted = currentWeekUserVote.dishes || [];
                this.already_voted = !!dishes_voted.length;
                this.orderItems = [];

                // FIXME: populate previously saved order
                for(let menuitem of this.menuItems) {
                    if(this.majority.has(menuitem.id)) {
                        this.orderItems.push({
                            quantity: 0,
                            id: menuitem.id,
                            name: menuitem.name,
                            price: menuitem.price
                        })
                    }
                }
                // (dishes_voted||[]).forEach(dish_id => this.selectedItems.add(dish_id));
            })
            .catch(console.error)
    }

    get subheadTitle() {
        let d = '';
        if(this.order_deadline) {
            d = new Date(this.order_deadline).toLocaleString().split('T')[0]
        }
        return 'Deadline : ' + d
    }

    showSubmit() {
        return this.currentWeek && !this.timePassed && !!this.voting_status && !this.order_status
    }

    orderSubmit = () => {
        console.log(this.orderItems);
        // this.MenuService.find()
        //     .then(resp => {
        //         console.log(resp);
        //     })
    }

    getVotedItems() {
        // console.log('i am here ', this.VoteService)
        // this.VoteService.find()
        //  .then((result)=>{
        //      console.log(result);
        //      if(!result || result.length <= 0) return;
        //      if(result.length > 0){
        //          result.forEach(item => {
        //              return item;
        //          });
        //          this.voteItems = result;
        //          // console.log(this.voteItems)
        //      }
        //  })
        //  .catch(err => console.log(err));
    }
}

export default OrderController;