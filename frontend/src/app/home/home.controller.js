class homeCtrl {
    constructor($state) {
        'ngInject';
        this.$state = $state;
        this.user = {};
    }

    submit() {
    	console.log(this.user);
    }
}

export default homeCtrl;

