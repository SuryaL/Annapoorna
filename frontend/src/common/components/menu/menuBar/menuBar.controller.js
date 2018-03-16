class menuBarCtrl {
    constructor($state, UserService,TabsService) {
        'ngInject';
        this.UserService = UserService;
        this.TabsService = TabsService;
        this.tabsList= this.TabsService.getTabsList();
        // console.log(this.tabsList)
       
    }

    getUsers() {
        this.UserService.find()
            .then((result) => {
                this.usersList = result;
                console.log(result)
            })
            .catch(err => console.error(err));
    }

    setTabNum(id){
        this.TabsService.setCurrentTab(id);
    } 

}

export default menuBarCtrl;