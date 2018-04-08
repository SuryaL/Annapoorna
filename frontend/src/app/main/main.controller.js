class mainController {
    constructor($state, $auth, TabsService, $scope, $timeout, FeedbackPopup, OrderService, MyToastr) {
        'ngInject';
        Object.assign(this, { $state, $auth, FeedbackPopup, OrderService, MyToastr });
        this.user = this.$auth.getUser();
        this.TabsService = TabsService;
        this.tabs = this.TabsService.fetchTabsForType(this.user.type)

        startloading;
        this.OrderService
            .getMyMissedRatings()
            .then(missed_ratings => {
                // console.log('missed_ratings', missed_ratings);
                stoploading;

                if(missed_ratings.length) {
                    let pop = this.FeedbackPopup.open(missed_ratings, (info) => {
                        console.log('submit', info);
                        if(info.action != 'update_ratings' || !info.data || !info.data.ratings) {
                            pop.btnClicked = false;
                            return;
                        }

                        startloading;
                        this.OrderService.updateMyOrderRatings(info.data)
                            .then(() => {
                                stoploading;
                                pop.close();
                            })
                            .catch((err) => {
                                console.error(err);
                                pop.btnClicked = false;
                                this.MyToastr.error('Failed')
                                stoploading;
                            })
                    });
                }
            }).catch((err) => {
                console.error(err);
                stoploading;
                // this.MyToastr.error('Failed');
            })

        // startloading;
        // $timeout(_=>stoploading,3000)
        // $timeout(_=>startloading,6000)
    }
}

export default mainController;