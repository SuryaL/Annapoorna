import PopupHtml from './emailusers.html';
import './emailusers.scss';

let emailusersPopupFactory = function($popup, $q) {
    'ngInject';
    var self = this;

    self.open = function(users, cb) {  

        let mypopup = $popup.open({      
            template: PopupHtml,
            themeClass: 'email-users-popup-dialog',
            closeOnEscape: false,
            closeOnOverlayClick: true,
            showCloseButton: true,
            // openingClass: 'custompopup-content-opening',
            // closingClass: 'custompopup-content-closing',
            // openingOverlayClass: 'custompopup-overlay-opening',
            // closingOverlayClass: 'custompopup-overlay-closing',
            controller: function($scope, $popup) {        
                'ngInject';
                $scope.texts = {
                    header: 'Email Users',
                    subHeader: ''
                };

                $scope.selected_users = new Set();
                $scope.toggleUserSelect = (id) => {
                    $scope.isSelectedUser(id) ? $scope.selected_users.delete(id) : $scope.selected_users.add(id)
                }
                $scope.isSelectedUser = (id) => $scope.selected_users.has(id);
                $scope.toggleSelectAll = () => {
                    $scope.allselected ? $scope.selected_users.clear() : $scope.selectAllUsers();
                }
                
                Object.defineProperty($scope, 'allselected', { get: function() { return $scope.userslist.length == $scope.selected_users.size} });
                
                $scope.selectAllUsers = () => $scope.userslist.forEach(user=>$scope.selected_users.add(user.id))
                // $scope.isAllSelected = () => $scope.userslist.length == $scope.selected_users.size

                $scope.userslist = (users||[]).map((user_list_item)=>{
                    return ({
                        id:user_list_item.id,
                        name:user_list_item.first_name || user_list_item.email,
                        type:user_list_item.type,
                        get userSelected() {
                            return $scope.isSelectedUser(this.id)
                        }
                    })
                })

                $scope.submit = () => {
                    if(!!mypopup.btnClicked) {
                        return;
                    }

                    mypopup.btnClicked = true;
                    cb && cb({
                        action: 'email_users',
                        data: {
                            email_body: $scope.email_body,
                            ids: [...$scope.selected_users]
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

export default emailusersPopupFactory;