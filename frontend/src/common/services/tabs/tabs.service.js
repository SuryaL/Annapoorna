let TabsFactory = function($http, $state) {
    'ngInject';

    let self = this;
    this.currentTab = 1;
    this.tabs = [{
        id: 1,
        name: 'Vote',
        param: 'vote',
        visibleToUser :true
    }, {
        id: 2,
        name: 'Order',
        param: 'order',
        visibleToUser :true
    }, {
        id: 3,
        name: 'History',
        param: 'history',
        visibleToUser :true
    }, {
        id: 4,
        name: 'User',
        param: 'user',
        visibleToUser :true
    }, {
        id: 5,
        name: 'Profile',
        param: 'profile',
        visibleToUser :true
    }]

    self.setCurrentTab = function(id){
        this.currentTab = id;
    }

    self.getCurrentTab = function(){
        // console.log(this.currentTab);
        return this.currentTab;
    }

    self.getTabsList = function(){
        return this.tabs;
    }
    return self;
};

export default TabsFactory;
