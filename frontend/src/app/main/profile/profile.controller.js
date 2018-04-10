class ProfileController {
    constructor($auth,UserService) {
        'ngInject';
        this.name = 'Profile';
        this.headTitle = "Profile";
        this.subheadTitle = ".";
        Object.assign(this,{
            $auth,
            UserService
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
            image: user.image,
            id: user.id
        };
    }
}

export default ProfileController;
