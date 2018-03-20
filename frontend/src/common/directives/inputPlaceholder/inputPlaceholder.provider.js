function InputPlaceholderProvider() {
    'ngInject';
    let animationScale = 0.9;
    let animationTime = 0.2;
    let animationDelay = 0;
    let placeholderLinkDelay = 0;
    let switchOnFocus = false; // Set to true to switch on focus . By default false => switches on value
    // In em
    const transUpRatio = {
        x: 0,
        y: 1.0
    }
    const transDownRatio = {
        x: 0,
        y: 1.0
    }
    const validateTime = (time) => {
        let temp_time = +time;
        if (!temp_time) {
            temp_time = 0.2;
        }
        temp_time = temp_time.toString();
        temp_time = temp_time.replace(/[^.0-9]/gi, '');
        return temp_time
    }

    return {
        setTransUpRatio: function({ x, y }) {
            if (x || x == 0) transUpRatio.x = x;
            if (y || y == 0) transUpRatio.y = y;
        },
        setTransDownRatio: function({ x, y }) {
            if (x || x == 0) transDownRatio.x = x;
            if (y || y == 0) transDownRatio.y = y;
        },
        setAnimationScale: function(value) {
            animationScale = +value;
        },
        setAnimationTime: function(time = 0.2) {
            animationTime = validateTime(time);
        },
        setAnimationDelay: function(delay = 0) {
            animationDelay = +delay;
        },
        setSwitchOnFocus: function(bool) {
            switchOnFocus = !!bool;
        },
        setPlaceholderLinkDelay: function(delay = 0) {
            placeholderLinkDelay = +delay;
        },
        $get: function() {
            const getTransUpRatio = _ => angular.copy(transUpRatio)
            const getTransDownRatio = _ => angular.copy(transDownRatio)
            const getAnimationScale = _ => animationScale
            const getAnimationTime = _ => animationTime
            const getAnimationDelay = _ => animationDelay
            const getPlaceholderLinkDelay = _ => placeholderLinkDelay
            const getSwitchOnFocus = _ => switchOnFocus;
            return {
                getTransUpRatio,
                getTransDownRatio,
                getAnimationScale,
                getAnimationTime,
                getAnimationDelay,
                getPlaceholderLinkDelay,
                getSwitchOnFocus,
                validateTime
            }
        }
    };
}


export default InputPlaceholderProvider;