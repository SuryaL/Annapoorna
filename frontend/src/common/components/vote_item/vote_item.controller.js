class voteCtrl {
    constructor($state) {
        'ngInject';
        this.user = {};
        this.limitedSelections = 5;
    }

    $onInit() {
    }
    selectItem = () => {

        if(this.selectedItem(this.item) <  this.limitedSelections){
            this.item.isSelected =  !this.item.isSelected ;
        }
        else if(this.item.isSelected ){
            this.item.isSelected =  !this.item.isSelected ;
        }
       this.selectedItem(this.item);
    }
}

export default voteCtrl;

