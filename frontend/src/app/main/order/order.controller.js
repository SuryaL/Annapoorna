class OrderController {
    constructor($state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, $rootScope) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService, VoteService, StatusService, $q, MenuVotingLimit, MyToastr, OrderService, $filter, $rootScope });
        this.user = {};
        // this.headTitle = 'Order this week\'s dishes';

        this.orderItems = [];
        this.dishes_voted = [];
        // this.btnText = "order";
        // this.getVotedItems();
        // this.order_deadline = '03-20-2018';
        this.init();
    }

    init() {
        startloading;
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

                const assures = currentWeekUserVote.assure||{};
                this.dishes_voted = dishes_voted;
                this.already_voted = !!dishes_voted.length;
                this.orderItems = [];
                // FIXME: populate previously saved order
                for(let menuitem of this.menuItems) {
                    if(this.majority.has(menuitem.id)) {

                        // TODO: should we show the price for which they ordered?
                        // How to update the new price?
                        const item_ordered = this.myorders.find(ord => ord.dish == menuitem.id);
                        const { id, name, price } = menuitem;
                        const quantity = item_ordered ? item_ordered.quantity : 0;
                        this.orderItems.push({ id, name, price, quantity , min: assures[id]||0, rating:menuitem.rating})
                    }
                }
                console.log( this.orderItems);
                stoploading;
                // (dishes_voted||[]).forEach(dish_id => this.selectedItems.add(dish_id));
            })
            .catch(error => {
                console.error(error);
                stoploading;
            })
    }

    get subheadTitle() {
        let d = '';
        if(this.order_deadline) {
            d = this.$filter('date')(this.order_deadline,'EEE MMM d,  h:mm:ss a');
        }
        return !d? '...' :'Deadline : ' + d
    }

    get headTitle(){
        let d = '';
        if(this.currentWeek){
            d = this.$filter('date')(this.currentWeek,'MMM d');
        }
        return !d?  '...' : d +' week\'s dishes';
    }

    get orderTotal() {
        return(this.orderItems || []).reduce((p, c) => {
            p += c.quantity * +c.price
            return p;
        }, 0)
    }

    get btnText() {
        let text = '';
        if((this.myorders || []).length) {
            text = 'Update Order';
        } else {
            text = 'Order';
        }

        // orderTotal ? text += ' (' + this.$filter('currency')(this.orderTotal) +')': '';
        return text
    }

    showSubmit() {
        return this.currentWeek && !this.timePassed && !!this.voting_status && !this.order_status
    }

    vItemClicked(event) {
        if(!this.showSubmit()) {
            event.stopPropagation();
            event.preventDefault();
            this.MyToastr.error(`Ordering Disabled!`);
            return false;
        }
    }

    orderSubmit = () => {
        // TODO: check valid data
        if(this.timePassed) {
            return this.MyToastr.error(`Time Expired!`);
        }

        if(!this.showSubmit()) {
            return this.MyToastr.error(`Ordering closed`);
        }

        const dishes = this.getDishesToOrder();
        if(!dishes || !this.currentWeek) {
            return this.MyToastr.error(`Failed`);
        };
        startloading;
        this.OrderService.createMyOrder({ week: this.currentWeek, dishes })
            .then((resp) => {
                this.MyToastr.success('Order Placed');
                this.$rootScope.$broadcast('pay-update');
                this.init();
            }).catch((err) => {
                this.MyToastr.error('Failed');
                console.error(err);
                stoploading;
            })
    }

    getDishesToOrder() {
        return(this.orderItems || []).map(oItem => ({
            dish: oItem.id,
            dish_name: oItem.name,
            price: oItem.price,
            quantity: oItem.quantity,
        })).filter(ord => ord.quantity);
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