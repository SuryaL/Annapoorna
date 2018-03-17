class ProfileController {
    constructor($auth) {
        'ngInject';
        this.name = 'Profile';
        Object.assign(this,{
            $auth
        })
    }

    logout() {
        this.$auth.logout();
    }
}

export default ProfileController;
