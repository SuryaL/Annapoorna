class voteCtrl {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService });
        this.user = {};
        this.headTitle = 'Vote for this week\'s dishes';
        this.subheadTitle = '8.8.88';
        this.footerText = "Vote";
       this.getMenuItems();
       this.menuTypes=['special','regular'];
    }

    vote() {
        console.log(this.voteItems);
        this.MenuService.find()
            .then(resp => {
                console.log(resp);
            })
    }

    submit() {
        console.log(this.user);
    }

    getMenuItems(){
       this.MenuService.find()
        .then((result)=>{
            if(!result || result.length < 0) return;
            if(result.length > 0){
                result.forEach(item => {
                    item.isSelected = false;
                    item.itemName = item.name;
                    item.type = Math.random(0,1) > 0.5 ? 'special' :'regular';
                    delete item.name;
                    return item;
                });
                this.voteItems = result;
                // console.log(this.voteItems)
            }
        })
        .catch(err => console.log(err));
    }


}

export default voteCtrl;