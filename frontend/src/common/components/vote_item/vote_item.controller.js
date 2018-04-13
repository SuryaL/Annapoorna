class voteCtrl {
    constructor($state, $scope) {
        'ngInject';
        this.user = {};
        let self = this;
        $scope.$watch('self.item.quantity',(nv,ov)=>{
            console.log(nv,ov);
            if(+nv == 0){
                // if(self.isSelected){
                //     self.selectItem();
                // }
            }else if(+nv >0){
                if(!self.isSelected){
                    self.selectItem();
                }
            }
        })
    }

    get isSelected(){
        return this.isSelectedItem(this.item.id)
    }

    selectItem = () => {
        this.itemToggled(this.item.id);
        if(!this.isSelected){
            this.item.quantity = 0;
        }
    }
}

export default voteCtrl;

