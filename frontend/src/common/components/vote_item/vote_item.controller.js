class voteCtrl {
    constructor($state,MyToastr,MenuVotingLimit) {
        'ngInject';
        this.user = {};
        this.MyToastr = MyToastr;
        this.MenuVotingLimit = MenuVotingLimit;
    }

    $onInit() {
    }
    selectItem = () => {

        if(this.selectedItem(this.item) <  this.MenuVotingLimit){
            this.item.isSelected =  !this.item.isSelected ;
        }
        else if(this.item.isSelected ){
            this.item.isSelected =  !this.item.isSelected ;
        }
        else if(!this.item.isSelected ){
            this.MyToastr.error("Select atmost "+this.MenuVotingLimit+" dishes");
        }
       this.selectedItem(this.item);
    }
}

export default voteCtrl;

