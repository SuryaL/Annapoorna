class UsersController {
    constructor($state, $auth, MenuService) {
        'ngInject';
        Object.assign(this, { $state, $auth, MenuService });
        this.user = {};
        this.headTitle = 'Users List';
        this.subheadTitle = '8 users';
       
        this.footerText = "users";

    }

    
}

export default UsersController;