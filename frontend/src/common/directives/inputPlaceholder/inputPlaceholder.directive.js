function InputPlaceholderDirective ($timeout, $parse, inputPlaceholder) {
    'ngInject';
    return {
        require: 'ngModel',
        restrict: 'A',
        //scope: true,
        link: function(scope, element, attributes, ngModel) {

            // NOTE :
            /// using append makes the mobile ios keyboard not switch to another keyboard type when clicked on another input type immediately
            // "pointer-events : none" didn't do the trick.
            // need to rewrite using :after

            // check if already added
            let iPlaceholderLinkDelay = inputPlaceholder.getPlaceholderLinkDelay();
            let focused = false;
            let watch = null;
            if (attributes.hasOwnProperty('iPlaceholderLinkDelay')) iPlaceholderLinkDelay = attributes.iPlaceholderLinkDelay;

            // for reinitializing the placeholders on event (use incases where the view is hidden on link)
            // options  =  {
            //    replace_element: true  // Use this when use change the text.
            //}
            scope.$on('reinit-iplaceholder', (event, options={}) => {
                $timeout(() => init(options), +iPlaceholderLinkDelay * 1000)
            });

            $timeout(() => {
                init();
            }, +iPlaceholderLinkDelay * 1000);

            function init({replace_element}={}) {
                let inputPlaceholderText =  attributes.inputPlaceholder || '';
                ondestroy(); // for re-init
                focused = false;

                let iPlaceholderInit = angular.element(element.parent())[0].querySelector('.i-placeholder')

                // Remove Element if necessary
                if(replace_element){
                    iPlaceholderInit.remove();
                    iPlaceholderInit = null;
                }

                // Add if not exists
                if (!iPlaceholderInit )
                    element.parent().append(
                        `<span class="i-placeholder">
                    ${inputPlaceholderText || ""}
                        </span>`)


                let iPlaceholder = angular.element(element.parent())[0].querySelector('.i-placeholder')
                    // INIT FROM PROVIDER
                let transUp = inputPlaceholder.getTransUpRatio();
                let transDown = inputPlaceholder.getTransDownRatio();
                let animationScale = inputPlaceholder.getAnimationScale();
                let animationTime = inputPlaceholder.getAnimationTime();
                let animationDelay = inputPlaceholder.getAnimationDelay();
                let switchOnFocus = inputPlaceholder.getSwitchOnFocus();

                // Override from attributes
                if (attributes.iTransDownX || attributes.iTransDownX == 0) transDown.x = attributes.iTransDownX;
                if (attributes.iTransDownY || attributes.iTransDownY == 0) transDown.y = attributes.iTransDownY;
                if (attributes.iTransUpX || attributes.iTransUpX == 0) transUp.x = attributes.iTransUpX;
                if (attributes.iTransUpY || attributes.iTransDownX == 0) transUp.y = attributes.iTransUpY;
                if (attributes.hasOwnProperty('iAnimationScale')) animationScale = attributes.iAnimationScale;
                if (attributes.hasOwnProperty('iAnimationTime')) {
                    animationTime = inputPlaceholder.validateTime(attributes.iAnimationTime)
                }
                if (attributes.hasOwnProperty('iAnimationDelay')) {
                    animationDelay = attributes.iAnimationDelay
                }

                let input_orig_height = element[0].offsetHeight; // input height
                let ip_orig_height = iPlaceholder.offsetHeight; // placeholder text height
                // console.log(inputPlaceholderText, input_orig_height, ip_orig_height)
                // console.log(input_orig_height, ip_orig_height)

                let transUpY_calc = +transUp.y * (-0.5 * input_orig_height - 1.0 * ip_orig_height);
                let transDownY_calc = -0.5 * +transDown.y * (ip_orig_height);
                angular.element(iPlaceholder).css('line-height', input_orig_height + ' px');

                let reset = () => element[0].value ? goUp() : goBack();
                let goUp = translateBy.bind(null, +animationScale, +transUp.x, transUpY_calc, 'i-placeholder-up', 'em', 'px');
                let goBack = translateBy.bind(null, 1, +transDown.x, transDownY_calc, 'i-placeholder-down', 'em', 'px');

                $timeout(() => reset());
                element.on('blur', blur)
                element.on('focus', focus)

                // watch for a change in model value to empty
                // console.log('registered',ngModel)
                watch = scope.$watch(() => {
                    return (!!ngModel.$viewValue)
                }, function(newV, oldV) {
                    resetOnChange()
                }, true);
                element.on('keydown', resetOnChange);

                function resetOnChange(event){
                    if (!switchOnFocus)
                        $timeout(() => reset(), 30)
                }

                function focus() {
                    focused = true;
                    !!switchOnFocus && $timeout(() => goUp(), 30)
                }

                function blur() {
                    focused = false;
                    $timeout(() => reset(), 30)
                }
                scope.$on('$destroy', function() {
                    ondestroy();
                })

                ////////////////////////////////////////////

                let str1 = `${animationTime}s ease-out transform`;
                let str2 = `${animationTime}s ease-out -webkit-transform`;

                angular.element(iPlaceholder).css('-webkit-transition', str1);
                angular.element(iPlaceholder).css('-moz-transition', str1);
                angular.element(iPlaceholder).css('-ms-transition', str1);
                angular.element(iPlaceholder).css('-o-transition', str1);
                angular.element(iPlaceholder).css('transition', str1);
                angular.element(iPlaceholder).css('-webkit-transition', str2);
                angular.element(iPlaceholder).css('-moz-transition', str2);
                angular.element(iPlaceholder).css('-ms-transition', str2);
                angular.element(iPlaceholder).css('-o-transition', str2);
                angular.element(iPlaceholder).css('transition', str2);
                if (animationDelay || animationDelay == 0) {
                    let delay = `${+animationDelay}s`;
                    angular.element(iPlaceholder).css('-webkit-transition-delay', delay);
                    angular.element(iPlaceholder).css('transition-delay', delay);
                }

                function ondestroy() {
                    element.off('blur', blur);
                    element.off('focus', focus);
                    element.off('keydown', resetOnChange);
                    watch && watch();
                }
            }


            ////

            function translateBy(scale, translateValueX, translateValueY, className, typex = 'em', typey = 'em') {
                let iPlaceholder = angular.element(element.parent())[0].querySelector('.i-placeholder')
                angular.element(iPlaceholder).removeClass('i-placeholder-up i-placeholder-down').addClass(className);

                angular.element(iPlaceholder).css('transform', 'translate3d(' + translateValueX + typex + ',' + translateValueY + typey + ',0) scale(' + scale + ') ');
                angular.element(iPlaceholder).css('-webkit-transform', 'translate3d(' + translateValueX + typex + ',' + translateValueY + typey + ',0) scale(' + scale + ')');
            }
        }
    };
}

export default InputPlaceholderDirective;
