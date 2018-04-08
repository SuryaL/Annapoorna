class mainController {
    constructor($state, $auth, TabsService, $scope, $timeout, FeedbackPopup, OrderService) {
        'ngInject';
        Object.assign(this, { $state, $auth, FeedbackPopup, OrderService });
        this.user = this.$auth.getUser();
        this.TabsService = TabsService;
        this.tabs = this.TabsService.fetchTabsForType(this.user.type)

        // this.OrderService
        //     .getMyMissedRatings()
        //     .then(missed_ratings => {
        //         // console.log('missed_ratings', missed_ratings);
        //         this.FeedbackPopup.open(missed_ratings,(data)=>{
        //             console.log('submit',data);
        //         });
        //     })

        // startloading;
        // $timeout(_=>stoploading,3000)
        // $timeout(_=>startloading,6000)
    }
}

export default mainController;