import templateHTML from './starsy.html';

let starsyDirective = function() {
    'ngInject';

    return {
        restrict: 'E',
        replace: true,
        scope: {
            mode: '@',
            percent: '=',
            numberOfStars: '@',
            margin: '@',
            output: '=',
            disable: '=',
            callback: '=',
            aspectRatio: '@', //  width/height of the image (this will set the aspectRatio of div surrounding to be same as the image)
            overrideWidth: '@',
            overrideHeight: '@',
            outOf: '@',
            thisMuch: '=',
            bright:'@',
            offIcon:'@',
            offIconBright:'@',
            onIcon:'@'
        },
        link: function(scope, elem, attrs) {
            var offIcon = scope.offIcon ? scope.offIcon : require('./images/Star-Off@2x.png');
            var offIconBright = scope.offIconBright ? scope.offIconBright : require('./images/Star-Off-bright@2x.png');
            var onIconBright = scope.onIcon ? scope.onIcon : require('./images/Star-On@2x.png');
            
            scope.starOnIcon = onIconBright;
            scope.starOffIcon = (scope.bright == 'true')? offIconBright : offIcon;
            scope.getNumber = getNumber;
            scope.height = +scope.overrideHeight || (elem.parent())[0].offsetHeight;
            scope.width = +scope.overrideWidth || (scope.height * (+scope.aspectRatio || 1)); // not able to calculate  aspect ratio when svgs are icons
            scope.margin = Number(scope.margin) || 0;
            scope.numberOfStars = Number(scope.numberOfStars) || 5;
            scope.outOf = scope.outOf ? scope.outOf : scope.numberOfStars;

            scope.touched = touchCallback;
            scope.click = clickCallback;

            if (scope.mode == 'read' || !scope.mode) {
                scope.widthArray = getWidthArray();
            }

            scope.$watch('thisMuch', (newV) => {
                if (newV) {
                    scope.widthArray = getWidthArray();
                }
            })

            scope.$watch('percent', (newV) => {
                if (newV) {
                    scope.widthArray = getWidthArray();
                }
            })

            /*===============================
            =            Helpers            =
            ===============================*/

            function getNumber(num) {
                return new Array(Number(num));
            }

            function is_touch_device() {
                return 'ontouchstart' in window // works on most browsers 
                    || navigator.maxTouchPoints; // works on IE10/11 and Surface
            };

            function clickCallback(ind) {
                if (!is_touch_device()) touchCallback(ind);
            }

            function touchCallback(ind) {
                if (scope.mode == 'write' && !scope.disable) {
                    scope.widthArray = setWidthArray(ind);
                    scope.output = {
                        value: ind + 1,
                        total: scope.numberOfStars,
                        percent: ((ind + 1) / scope.numberOfStars) * 100
                    }
                    scope.callback ? scope.callback() : '';
                }
            }

            function getWidthArray() {
                let array = [];
                let indvPercent = 100 / scope.numberOfStars;
                let givenPercent;
                if (!!scope.percent) {
                    givenPercent = scope.percent;
                } else {
                    givenPercent = (100 * (scope.thisMuch || 0) / Number(scope.outOf));
                }
                for (let i = 0; i < scope.numberOfStars; i++) {
                    let prevValue = givenPercent;
                    if (givenPercent >= indvPercent) {
                        givenPercent = givenPercent - indvPercent;
                        array.push(100);
                    } else {
                        let diff = (givenPercent / indvPercent) * 100;
                        givenPercent = 0;
                        array.push(diff);
                    }
                }
                return array;
            }

            function setWidthArray(ind) {
                let array = [];
                for (let i = 0; i < scope.numberOfStars; i++) {
                    if (i <= ind) {
                        array.push(100);
                    } else {
                        array.push(0);
                    }
                }
                return array;
            }

            /*=====  End of Helpers  ======*/

        },
        // controller:function($scope){
        //  'ngInject';
        // },
        template: templateHTML
    }

}

export default starsyDirective;
