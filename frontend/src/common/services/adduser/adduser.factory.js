import PopupHtml from './adduser.html';
import './adduser.scss';

let AddUserPopupFactory = function($popup, $q) {
    'ngInject';
    var self = this;

    self.open = function(cb) {  

        let mypopup = $popup.open({      
            template: PopupHtml,
            themeClass: 'add-user-popup-dialog',
            closeOnEscape: false,
            closeOnOverlayClick: true,
            showCloseButton: true,
            // openingClass: 'custompopup-content-opening',
            // closingClass: 'custompopup-content-closing',
            // openingOverlayClass: 'custompopup-overlay-opening',
            // closingOverlayClass: 'custompopup-overlay-closing',
            controller: function($scope, $popup) {        
                'ngInject';
                $scope.user_types = ['user','cook'];
                $scope.user_email = '';
                $scope.changeActiveUserType = (user_type) =>{
                    $scope.active_user_type = user_type;
                }
                $scope.changeActiveUserType($scope.user_types[0]);
                $scope.texts = {
                    header: 'Add User', 
                    subHeader: 'Select the user type'
                };   

                $scope.submit = () =>{
                    if(!!mypopup.btnClicked){
                        return;
                    }

                    mypopup.btnClicked = true;
                    cb && cb({
                        action:'user_add',
                        data:{
                            email:$scope.user_email, 
                            type:$scope.active_user_type
                        }
                    });
                }
               
                $scope.close = function() {   
                    mypopup.close('Awww yisss');
                };
                $scope.cancel = function() {
                    mypopup.cancel();
                };        
                $scope.hide = function() {          
                    mypopup.hide();
                };      
            }
        });
        return mypopup;
    };

    return self;
};

export default AddUserPopupFactory;
