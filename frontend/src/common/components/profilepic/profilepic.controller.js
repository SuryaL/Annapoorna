class ProfilepicController {
    constructor($sce) {
        'ngInject';
        this.name = 'Profilepic';
        this.$sce = $sce;
        // this.defaultPic = require('~assets/images/blank_profile.png');
    }

    get imageurl(){
        if(this.image){
            return this.$sce.trustAsResourceUrl(this.image)
        }
        else{
            return '';
        }
    }
}

export default ProfilepicController;
