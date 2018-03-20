class voteCtrl {
    constructor($state, $auth, MenuService,VoteService) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            MenuService
        });
        this.user = {};
        this.headTitle = 'Vote for this week\'s dishes';
        this.getMenuItems();
        this.menuTypes = ['special', 'regular'];
        this.btnText = "Vote";
        this.votesCount = 0;
        this.selectedItems = new Set();
        this.vote_deadline = '03-19-2018';
        this.VoteService = VoteService;


    }
    get subheadTitle() {
        return 'Deadline : ' + this.vote_deadline.replace(/-/g, '.')
    }
    voteClicked = () => {
        console.log('vote');
        if(!this.selectedItems || this.selectedItems.size < 1) return ;
        this.VoteService.create({dishes:this.selectedItems})
        .then(resp => {
            console.log(resp);
        })
        .catch(err=> console.log(err));
    }

    submit() {
        console.log(this.user);
    }

    getMenuItems() {
        this.MenuService.find()
            .then((result) => {
                if (!result || result.length < 0) return;
                if (result.length > 0) {
                    result.forEach(item => {
                        item.isSelected = false;
                        item.itemName = item.name;
                        // item.type = Math.random(0, 1) > 0.5 ? 'special' : 'regular'; // 
                        delete item.name;
                        return item;
                    });
                    this.voteItems = result;
                    // console.log(this.voteItems)
                }
            })
            .catch(err => console.log(err));
    }
    getSelectedItems = (item) => {

        if (item.isSelected == true) this.selectedItems.add(item.id);
        else if (this.selectedItems.has(item.id)) this.selectedItems.delete(item.id);
        // console.log(this.selectedItems, this.selectedItems.size)
        let totalVotes = this.selectedItems.size ? this.selectedItems.size : 0;
        return totalVotes;

    }




}

export default voteCtrl;