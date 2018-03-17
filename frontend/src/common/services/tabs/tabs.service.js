let TabsFactory = function($http, $state) {
    'ngInject';

    let self = this;
    self.all_tabs = [{
        id: 1,
        name: 'Vote',
        state: 'app.main.vote',
        visibility :['user','cook','admin']
    }, {
        id: 2,
        name: 'Order',
        state: 'app.main.order',
        visibility :['user','cook','admin']
    }, {
        id: 3,
        name: 'History',
        state: 'app.main.history',
        visibility :['user','cook','admin']
    }, {
        id: 4,
        name: 'Users',
        state: 'app.main.users',
        visibility :['user','cook','admin']
    }, {
        id: 5,
        name: 'Profile',
        state: 'app.main.profile',
        visibility :['user','cook','admin']
    }]

    self.fetchTabsForType = (user_type) => self.all_tabs.filter(tab => tab.visibility.indexOf(user_type) != -1);
    
    return self;
};

export default TabsFactory;
