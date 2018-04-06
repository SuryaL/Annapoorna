import mojs from 'mo-js/build/mo.min';
let MymoFactory = function($timeout, $window) {
    'ngInject';
    var self = this;
    self.mojs = mojs;
    let primary_color_shift = { 'rgba(0,255,255, 1)': 'magenta' };
    // let tertiary_color_shift = { 'white': 'rgba(0,255,0, 0)' };
    // let secondary_color_shift = { 'rgba(232, 44, 113, 0.75)': 'rgba(0,255,0, 0)' };
    let tertiary_color_shift = { 'white': 'rgb(238, 42, 123,0.2)' };
    let secondary_color_shift = { 'rgba(232, 44, 113, 0.75)': 'rgb(238, 42, 123, 0)' };
    let pink_col = 'rgb(238, 42, 123)';
    let yellow_col = 'rgb(255, 204, 0)';

    /**
     * Custom Shapes
     * 
     * 
     *  
    <path d="M72 7.4c0 .7-3.1 11-6.8 22.7-7.9 24.5-8.5 26.8-7.4 27 .4 0 5-3.2 10.2-7 8.7-6.5 9.9-7 14.4-7 3.4 0 5.6-.5 4.4-1.4L81 23.3C76.6 9.7 76 6.1 73.8 6.1c-1 0-1.8.5-1.8 1.3z"/>
    <path d="M68.3 63.1C62.9 67 57.7 72 52.5 75.3c-4.8 4.2-5.6 2.5 10.4 23l11.6 14.8 19 13.7c22.5 16.3 24.4 17.6 25.2 16.7.7-.7.2-2.2-9.9-33.8l-6-18.8-2.8-1-10.1-2.2-5.5-1.1-4.4 4-7 4.5s-6-5.9-6-6.9c0-.4 2.8-3 6.3-5.7C86 72.3 89 69.2 89 65.3c0-4.1-4.5-11.2-7.1-11.2-1 0-7.1 4-13.6 9z"/>
    <path d="M4 59.3c0 2.2 34 28.1 36 27.4.6-.2-.3-2-1-4.3a10.7 10.7 0 0 1-4-5 159 159 0 0 1 19.6-16.8c3.9-2.2-.1-2.7-24.6-2.7-21.3 0-26 .2-26 1.4z"/>
    <path d="M99 64.8c0 4.8-.6 7.8-2 10.5a21 21 0 0 0-2 4.5c0 1.4 14.4 4.6 17.2 3.9a160 160 0 0 0 28.6-20c5.8-5.6 5.5-5.4-19.3-5.5H99v6.6z"/>
    <path d="M45 95.6a438 438 0 0 0-16 47c0 2.2 1.6 1.3 12.2-6.3 19-13.6 24.8-17.6 23.6-19a211 211 0 0 0-18.5-23.4c-.7 0-1.6.8-1.3 1.7z"/>
     */

    class rstar1 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M72 7.4c0 .7-3.1 11-6.8 22.7-7.9 24.5-8.5 26.8-7.4 27 .4 0 5-3.2 10.2-7 8.7-6.5 9.9-7 14.4-7 3.4 0 5.6-.5 4.4-1.4L81 23.3C76.6 9.7 76 6.1 73.8 6.1c-1 0-1.8.5-1.8 1.3z"/>' }
    }
    class rstar2 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M68.3 63.1C62.9 67 57.7 72 52.5 75.3c-4.8 4.2-5.6 2.5 10.4 23l11.6 14.8 19 13.7c22.5 16.3 24.4 17.6 25.2 16.7.7-.7.2-2.2-9.9-33.8l-6-18.8-2.8-1-10.1-2.2-5.5-1.1-4.4 4-7 4.5s-6-5.9-6-6.9c0-.4 2.8-3 6.3-5.7C86 72.3 89 69.2 89 65.3c0-4.1-4.5-11.2-7.1-11.2-1 0-7.1 4-13.6 9z"/>' }
    }
    class rstar3 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M4 59.3c0 2.2 34 28.1 36 27.4.6-.2-.3-2-1-4.3a10.7 10.7 0 0 1-4-5 159 159 0 0 1 19.6-16.8c3.9-2.2-.1-2.7-24.6-2.7-21.3 0-26 .2-26 1.4z"/>' }
    }
    class rstar4 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M99 64.8c0 4.8-.6 7.8-2 10.5a21 21 0 0 0-2 4.5c0 1.4 14.4 4.6 17.2 3.9a160 160 0 0 0 28.6-20c5.8-5.6 5.5-5.4-19.3-5.5H99v6.6z"/>' }
    }
    class rstar5 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M45 95.6a438 438 0 0 0-16 47c0 2.2 1.6 1.3 12.2-6.3 19-13.6 24.8-17.6 23.6-19a211 211 0 0 0-18.5-23.4c-.7 0-1.6.8-1.3 1.7z"/>' }
    }
    mojs.addShape('rstar1', rstar1); // passing name and Bubble class
    mojs.addShape('rstar2', rstar2); // passing name and Bubble class
    mojs.addShape('rstar3', rstar3); // passing name and Bubble class
    mojs.addShape('rstar4', rstar4); // passing name and Bubble class
    mojs.addShape('rstar5', rstar5); // passing name and Bubble class

    self.createStarShapes = ['rstar2', 'rstar5', 'rstar1', 'rstar4', 'rstar3'].map((shapename, ind) => {
        return(obj) => {
            return new mojs.Shape({
                shape: shapename,
                // left: '50%',
                // fill: 'none',
                fill: secondary_color_shift,
                radius: { 40: 60 },
                stroke: tertiary_color_shift,
                strokeWidth: { 6: 0 },
                strokeDasharray: '100%',
                strokeDashoffset: { '100%': '200%' },
                angle: { 0: 18 },
                // repeat: 999,
                // isShowStart: true,
                duration: 1000,
                ...obj,
            }).then({
                shape: shapename,
                // left: '50%',
                // fill: 'none',
                fill: secondary_color_shift,
                radius: { 40: 60 },
                stroke: tertiary_color_shift,
                strokeWidth: { 6: 0 },
                strokeDasharray: '100%',
                strokeDashoffset: { '100%': '200%' },
                angle: { 0: 18 },
                repeat: 999,
                delay: 1000 * (ind),
                // isShowStart: true,
                duration: 1000,
                ...obj,
            })
        }
    })
    self.createRect = (obj) => {
        return new mojs.Timeline({}).add([
            // self.createRectShape(obj),
            self.createStarShapes[0](obj),
            self.createStarShapes[1](obj),
            self.createStarShapes[2](obj),
            self.createStarShapes[3](obj),
            self.createStarShapes[4](obj),
            // self.createShapeSwirl(obj),
            // self.createShapeSwirl2(obj),
            // self.createShapeCircle(obj)
        ])
    };

    self.initLoader = (obj={}) => {
        if(!self.loader) {
            self.loader = self.createRect(obj);
        }
    
        return self.loader
    }

    self.startLoading = () => {
        self.loader && !self.loading && self.loader.replay();
        self.loading = true;
    }



    self.stopLoading = () => {
       if(self.loader && self.loading){
           self.loader.pause();
           self.loader.reset();
           self.loader.setProgress(0);
           $timeout(() => {
               self.loader.setProgress(0);
               self.loading = false;
           }, 10);
       }
    }
    
    Object.defineProperty($window, 'startloading', { get: function() { return  self.startLoading()} })
    Object.defineProperty($window, 'stoploading', { get: function() { return  self.stopLoading()} })
    return self;
};

export default MymoFactory;