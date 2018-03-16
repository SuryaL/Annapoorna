class mainController {
    constructor($state, $auth,TabsService) {
        'ngInject';
        Object.assign(this, { $state, $auth });
        this.user = this.$auth.getUser();
        this.TabsService= TabsService;
        this.currentTab = this.TabsService.getCurrentTab();
        // console.log(this.currentTab );
    }
}

export default mainController;
