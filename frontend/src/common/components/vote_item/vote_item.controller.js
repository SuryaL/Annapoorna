class voteCtrl {
    constructor($state) {
        'ngInject';
        this.user = {};
    }

    get isSelected(){
        return this.isSelectedItem(this.item.id)
    }

    selectItem = () => {
        this.itemToggled(this.item.id);
    }
}

export default voteCtrl;

