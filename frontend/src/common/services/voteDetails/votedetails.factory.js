import PopupHtml from './votedetails.html';
import './votedetails.scss';

let votedetailsPopupFactory = function($popup, $q) {
    'ngInject';
    var self = this;

    console.log($popup);
    self.open = function(votes) {  

        let mypopup = $popup.open({      
            template: PopupHtml,
            themeClass: 'vote-details-popup-dialog',
            closeOnEscape: false,
            closeOnOverlayClick: true,
            showCloseButton: true,
            // openingClass: 'custompopup-content-opening',
            // closingClass: 'custompopup-content-closing',
            // openingOverlayClass: 'custompopup-overlay-opening',
            // closingOverlayClass: 'custompopup-overlay-closing',
            controller: function($scope) {        
                'ngInject';
                
                $scope.texts = {
                    header: 'Voting Details',
                    subHeader: ''
                };
                $scope.totalVotes = votes.totalVotes[0].dishes;
                $scope.menuList = votes.menuObj;
                $scope.usersList = votes.usersObj;

                $scope.close = function() {   
                    mypopup.close('Awww yisss');
                };
                $scope.cancel = function() {
                    mypopup.cancel();
                };        
                $scope.hide = function() {          
                    mypopup.hide();
                };     
                $scope.getDishName = function(id) {
                    return $scope.menuList[id]
                }
                $scope.getUserName = function(id) {
                    return $scope.usersList[id]
                }
            }
        });
        return mypopup;
    };
    return self;
};

export default votedetailsPopupFactory;