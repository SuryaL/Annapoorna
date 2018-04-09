let TabsFactory = function($http, $state) {
    'ngInject';

    let self = this;
    self.all_tabs = [{
        id: 1,
        name: 'Vote',
        state: 'app.main.vote',
        visibility :['user']
    }, {
        id: 2,
        name: 'Order',
        state: 'app.main.order',
        visibility :['user']
    }, {
        id: 3,
        name: 'History',
        state: 'app.main.history',
        visibility :['user']
    }, {
        id: 4,
        name: 'Users',
        state: 'app.main.users',
        visibility :['admin']
    },{
        id: 5,
        name: 'Orders',
        state: 'app.main.orders',
        visibility :['admin','cook']
    }]

    /** MOVED TO PROFILE ICON
     * {
        id: 6,
        name: 'Profile',
        state: 'app.main.profile',
        visibility :['user', 'cook', 'admin']
    }
     */

    self.fetchTabsForType = (user_types) => self.all_tabs.filter(tab => {
        let found=false;
         user_types.forEach((type)=>{
            if(tab.visibility.indexOf(type) != -1){
                found = true
            }
        }) 
        return found;
    });
    
    return self;
};

export default TabsFactory;
