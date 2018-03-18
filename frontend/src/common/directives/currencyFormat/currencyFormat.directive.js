let currencyFormatDirective = function($filter, $parse) {
    'ngInject';
    return {
        require: '?ngModel',
        link: function(scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$formatters.unshift(function(a) {
                if(ctrl.$modelValue == null || ctrl.$modelValue == undefined || ctrl.$modelValue == '') return ctrl.$modelValue;
                ctrl.$modelValue = ctrl.$modelValue.toString().replace(/[^\d|\-+|\.+]/g, '') || '0';
                ctrl.$modelValue = +((+ctrl.$modelValue).toFixed(2));
                return $filter("currency")(ctrl.$modelValue,"$",2)
            });

            elem.bind('blur', function(event) {
                if(elem.val() == null || elem.val() == undefined || elem.val() == '') {
                var modelGetter = $parse(attrs['ngModel']);
                var modelSetter = modelGetter.assign;
                     modelSetter(scope,"0");
                     elem.val($filter("currency")("0",  "$", 2))
                     scope.$apply();
                     return;
                }
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '') || 0;
                var modelGetter = $parse(attrs['ngModel']);
                var modelSetter = modelGetter.assign;
                plainNumber = (+plainNumber).toFixed(2);
                if(+plainNumber > 10000){
                    plainNumber = "10000";
                }
                    // if(+plainNumber < 0){
                    //     plainNumber = "0";
                    // }
                modelSetter(scope, plainNumber);
                elem.val($filter("currency")(plainNumber,  "$", 2));
                scope.$apply();
            });

        }
    };

}

export default currencyFormatDirective;