class QuantityPickerController {
    constructor() {
        'ngInject';
        this.name = 'QuantityPicker';
        this.quantity = !!(+this.quantity)? +this.quantity : 0;
        this.limit_max = 2;
        this.limit_min = !!(+this.min)? +this.min :0;
        if(this.quantity<this.limit_min){
            this.quantity= this.limit_min
        }
    }

    increment($event){
        $event.stopPropagation();
        if(this.quantity>=this.limit_max){
            return;
        }
        this.quantity++;
    }

    decrement($event){
        $event.stopPropagation();
        if(this.quantity<=this.limit_min){
            return;
        }
        this.quantity--;
    }
}

export default QuantityPickerController;
