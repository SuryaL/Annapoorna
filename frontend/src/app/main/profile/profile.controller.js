class ProfileController {
    constructor($auth) {
        'ngInject';
        this.name = 'Profile';
        Object.assign(this,{
            $auth
        });
        this.getProfileInfo();
        this.defaultPic = require('assets/images/blank_profile.png');
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
