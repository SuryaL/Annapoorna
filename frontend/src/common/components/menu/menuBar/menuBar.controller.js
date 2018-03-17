class menuBarCtrl {
    constructor($state) {
        'ngInject';
        this.$state = $state;
    }

    isCurrentState = (state) => this.$state.current.name == state
}

export default menuBarCtrl;