class mainController {
    constructor($state, $auth,TabsService, $scope, $timeout) {
        'ngInject';
        Object.assign(this, { $state, $auth });
        this.user = this.$auth.getUser();
        this.TabsService= TabsService;
        this.tabs = this.TabsService.fetchTabsForType(this.user.type)

        // startloading;
        // $timeout(_=>stoploading,3000)
        // $timeout(_=>startloading,6000)
    }
}

export default mainController;
