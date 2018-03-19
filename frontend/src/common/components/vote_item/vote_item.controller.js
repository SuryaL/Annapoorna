class voteCtrl {
    constructor($state) {
        'ngInject';
        this.user = {};
    }

    $onInit() {
    }
    selectItem = () => {
        let votes = this.selectedItem(this.item);
        console.log('the votes before voting : ',votes)
        // this.item.isSelected =  !this.item.isSelected;
        if(votes < 5){
            this.item.isSelected =  !this.item.isSelected ;
        }
        else if(this.item.isSelected ){
            this.item.isSelected =  !this.item.isSelected ;
        }
        console.log('the votes after voting are ',this.selectedItem(this.item));
            // this.votesCount = this.item.isSelected ? this.votesCount++ :this.votesCount--;
        // this.selectedItem(id);
            
    }
}

export default voteCtrl;

