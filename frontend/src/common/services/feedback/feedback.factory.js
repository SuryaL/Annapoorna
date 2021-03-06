import PopupHtml from './feedback.html';
import './feedback.scss';

let feedbackPopupFactory = function($popup, $q, MyToastr) {
    'ngInject';
    var self = this;

    self.open = function(missed_ratings, cb) {  

        let mypopup = $popup.open({      
            template: PopupHtml,
            themeClass: 'feedback-popup-dialog',
            closeOnEscape: false,
            closeOnOverlayClick: false,
            showCloseButton: false,
            // openingClass: 'custompopup-content-opening',
            // closingClass: 'custompopup-content-closing',
            // openingOverlayClass: 'custompopup-overlay-opening',
            // closingOverlayClass: 'custompopup-overlay-closing',
            controller: function($scope, $popup) {        
                'ngInject';
                $scope.texts = {
                    header: 'Feedback',
                    subHeader: ''
                };

                $scope.missed_ratings = missed_ratings || [];

                $scope.close = function() {   
                    mypopup.close('Awww yisss');
                };
                $scope.cancel = function() {
                    mypopup.cancel();
                };        
                $scope.hide = function() {          
                    mypopup.hide();
                }; 
                $scope.submitComments = function() { 
                    console.log($scope.missed_ratings);   
                    let toSubmit = [];
                    for(let missed_week of $scope.missed_ratings) {
                        for(let dish of missed_week.dishes) {
                            if(!dish.rating) {
                                MyToastr.error('Please rate all dishes');
                                return;
                            }
                            let { rating, dish_id, feedback } = dish;
                            rating = rating.value;
                            toSubmit.push({
                                rating,
                                dish_id,
                                feedback,
                                week: missed_week.week
                            })
                        }
                    }    
                    if(!!mypopup.btnClicked) {
                        return;
                    }

                    mypopup.btnClicked = true;
                    cb && cb({
                        action: 'update_ratings',
                        data: { ratings: toSubmit }
                    });  
                    // mypopup.hide();
                };      
            }
        });
        return mypopup;
    };

    return self;
};

export default feedbackPopupFactory;