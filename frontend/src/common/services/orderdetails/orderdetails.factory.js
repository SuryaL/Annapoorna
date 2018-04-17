import PopupHtml from './orderdetails.html';
import './orderdetails.scss';

let orderdetailsPopupFactory = function($popup, $q) {
    'ngInject';
    var self = this;

    self.open = function(orders) {  

        let mypopup = $popup.open({      
            template: PopupHtml,
            themeClass: 'order-details-popup-dialog',
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
                    header: 'Order Details',
                    subHeader: ''
                };
                $scope.orders = orders;
               
                $scope.close = function() {   
                    mypopup.close('Awww yisss');
                };
                $scope.cancel = function() {
                    mypopup.cancel();
                };        
                $scope.hide = function() {          
                    mypopup.hide();
                };     
                
                $scope.calcTotal = function(dishes){
                    return dishes.reduce((total,dish)=>{
                        total += +dish.price * +dish.quantity
                        return total;
                    },0)
                } 
            }
        });
        return mypopup;
    };
    return self;
};

export default orderdetailsPopupFactory;