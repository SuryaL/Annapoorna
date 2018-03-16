class mainController {
    constructor($state, $auth,TabsService, $scope) {
        'ngInject';
        Object.assign(this, { $state, $auth });
        this.user = this.$auth.getUser();
        this.TabsService= TabsService;

        //  this.user.type  == user
        // this.user.type = 'user';
        // this.tabs = this.TabsService.fetchTabsForType(this.user.type)
        this.tabs = this.TabsService.fetchTabsForType('user')
    }
}

export default mainController;
