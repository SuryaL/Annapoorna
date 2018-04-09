class HistoryItemController {
    constructor() {
        'ngInject';
        this.name = 'HistoryItem';
        this.has_comments = false;
    }
    $onInit(){
        this.item.dishes.forEach(dish => {
            if(!dish.ratings || !dish.ratings.length ) {
                dish.rating = 0;
                return;
            }
            if(dish.feedbacks.length) {
                this.has_comments = true;
            }
            let sum = dish.ratings.reduce((p,c)=>{
                p += +c;
                return p;
            },0);
            dish.rating = +(sum / dish.ratings.length).toFixed(2);
            
        });
    }
    toggleComments = (event) =>{
        // event.preventDefault();
        console.log(' HI TOGGLE')
        event.stopPropagation();
        this.show_comment = !this.show_comment;

    }

}

export default HistoryItemController;
