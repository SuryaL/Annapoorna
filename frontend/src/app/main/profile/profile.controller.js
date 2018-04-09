class ProfileController {
    constructor($auth) {
        'ngInject';
        this.name = 'Profile';
        this.headTitle = "Profile";
        this.subheadTitle = ".";
        Object.assign(this,{
            $auth
        });
        this.getProfileInfo();
    }

    logout() {
        this.$auth.logout();
    }
    
    getProfileInfo = () =>{
        console.log(' user details :',this.$auth.getUser());
        let user = this.$auth.getUser();
        this.userDetails={ 
            name : user.first_name ? user.first_name + ' ' + user.last_name : user.email,
            email :user.email,
            image: user.image
        };
    }
}

export default ProfileController;
