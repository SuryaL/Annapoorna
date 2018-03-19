class voteCtrl {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, {
            $state,
            $auth,
            MenuService
        });
        this.user = {};
        this.headTitle = 'Vote for this week\'s dishes';
        this.subheadTitle = '8.8.88';
        this.footerText = "Vote";
        this.getMenuItems();
        this.menuTypes = ['special', 'regular'];
        this.btnText = "Vote";
        this.votesCount = 0;
        this.selectedItems = new Set();
    }

    voteClicked = () => {
        console.log('vote');
        // this.MenuService.find()
        //     .then(resp => {
        //         console.log(resp);
        //     })
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
                        item.type = Math.random(0, 1) > 0.5 ? 'special' : 'regular';
                        delete item.name;
                        return item;
                    });
                    this.voteItems = result;
                    // console.log(this.voteItems)
                }
            })
            .catch(err => console.log(err));
    }
    getSelectedItems = (item) =>{

        // this.voteItems.forEach((item)=>{
        //     if(item.isSelected == true && item.id == id) this.votesCount++;
            if(item.isSelected == true) this.selectedItems.add(item.id);
            else if(this.selectedItems.has(item.id)) this.selectedItems.delete(item.id);

            console.log(this.selectedItems,this.selectedItems.size)
            let totalVotes = this.selectedItems.size ? this.selectedItems.size : 0 ;
        return totalVotes ;
        
    }




}

export default voteCtrl;