class OrderController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService });
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
                    // majority is current top dishes
                    this.VoteService.getMajority({ week: this.weekDetails.week }),
                    this.OrderService.getMyOrder({ week: this.weekDetails.week })
                ])
            })
            .then(([currentWeekVotes, majority, myorders]) => {
                this.myorders = myorders;
                this.majority = new Set(majority || []);

                const currentWeekUserVote = (currentWeekVotes || [])[0] || {};
                const dishes_voted = currentWeekUserVote.dishes || [];
                this.already_voted = !!dishes_voted.length;
                this.orderItems = [];
                // FIXME: populate previously saved order
                for(let menuitem of this.menuItems) {
                    if(this.majority.has(menuitem.id)) {

                        // TODO: should we show the price for which they ordered?
                        // How to update the new price?
                        const item_ordered = this.myorders.find(ord=> ord.dish == menuitem.id);
                        const {id,name,price} = menuitem;
                        const quantity = item_ordered ? item_ordered.quantity : 0;
                        this.orderItems.push({ id,name,price, quantity })
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
        // TODO: check valid data
        const dishes = this.orderItems.map(oItem => ({
            dish: oItem.id,
            dish_name: oItem.name,
            price: oItem.price,
            quantity: oItem.quantity,
        })).filter(ord => ord.quantity);
        console.log(this.orderItems, dishes, this.currentWeek);
        this.OrderService.createMyOrder({
                week: this.currentWeek,
                dishes
            })
            .then((resp) => {
                this.init();
                console.log(resp);
            }).catch(console.error)
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