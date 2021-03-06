import mojs from 'mo-js/build/mo.min';
let MymoFactory = function($timeout, $window) {
    'ngInject';
    var self = this;
    self.mojs = mojs;
    let primary_color_shift = { 'rgba(0,255,255, 1)': 'magenta' };
    // let tertiary_color_shift = { 'white': 'rgba(0,255,0, 0)' };
    // let secondary_color_shift = { 'rgba(232, 44, 113, 0.75)': 'rgba(0,255,0, 0)' };
    let tertiary_color_shift = { 'white': 'rgb(96, 173, 58,0.2)' };
    let tertiary_color_shift2 = { 'white': 'rgb(96, 173, 58,0)' };
    let secondary_color_shift = { 'rgba(96, 173, 58, 0.75)': 'rgb(96, 173, 58, 0)' };
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
                stroke: tertiary_color_shift2,
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
                stroke: tertiary_color_shift2,
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

    /**
     * CHEF 
     * */

    class chef1 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M105.66,53c1.25,0,2.18,0,3.1,0,1.33,0,2.55.24,3.09,1.7a2.71,2.71,0,0,1,.25,1,15.29,15.29,0,0,1-5.42,11.48,14.7,14.7,0,0,1-10,3.7A3.77,3.77,0,0,0,93,74.47a2.4,2.4,0,0,1-2.57,2.62,2.49,2.49,0,0,1-2.58-2.66c0-2.68-.16-5.37,0-8,.21-3-2.81-6.06-6.1-6.12-7.91-.16-13.68-4-17.34-11a16.85,16.85,0,0,1-2-8.29c0-1.8.86-2.71,2.67-2.72,3.84,0,7.69-.17,11.51.13a16.68,16.68,0,0,1,7.73,3A20.42,20.42,0,0,1,91.88,51a9.17,9.17,0,0,1,.58,2.27c.17,1.26.61,1.67,1.83,1.27a14.53,14.53,0,0,0,9.57-8.88,14,14,0,0,0,.49-7.88,13.89,13.89,0,0,0-9.48-10.59A14.29,14.29,0,0,0,78.43,33a5.68,5.68,0,0,1-1.11,1.4A2.43,2.43,0,0,1,74,34.21a2.79,2.79,0,0,1-.33-3.46,19,19,0,0,1,7.54-7.21c.87-.45.9-.84.36-1.52a33.06,33.06,0,0,0-11.64-9.5A29.89,29.89,0,0,0,53.34,9.69,30.72,30.72,0,0,0,30.88,23.08a30.4,30.4,0,0,0-4.69,10.54,54.37,54.37,0,0,0-.73,6.51c-.15,1.38-.43,2.63-2.07,3.07-1.31.36-3-.39-3-1.78a30.48,30.48,0,0,1,.32-6.53c.47-2.59,1.36-5.1,2.05-7.66a4.5,4.5,0,0,0,0-.93,25.19,25.19,0,0,0-3.86.63A14.19,14.19,0,0,0,9.69,35a13.5,13.5,0,0,0-.93,8.45,14.38,14.38,0,0,0,4.5,7.91,11.74,11.74,0,0,0,6.53,3.25c1.69.19,3.38.37,5.08.42a3.6,3.6,0,0,0,3.68-3.55c.25-5.77,2.64-10.38,7.65-13.38A22.13,22.13,0,0,1,41,36.4a13.81,13.81,0,0,1,2.54-.45,3,3,0,0,1,3,3c-.08,2.2.12,4.41,0,6.6a15.34,15.34,0,0,1-9,13.38c-3.11,1.54-6.44,1.44-9.78,1.42-2.59,0-2.28-.43-2.3,2.27,0,3.64,0,7.28,0,10.92a7.17,7.17,0,0,1-.32,2c-.35,1.17-1.27,1.65-2.74,1.56a2.07,2.07,0,0,1-2-1.81,9.66,9.66,0,0,1-.19-1.9c0-4,0-7.92,0-11.88,0-1.09-.4-1.48-1.51-1.66a17.37,17.37,0,0,1-7.74-3.57,18.88,18.88,0,0,1-6.62-9.12,18.7,18.7,0,0,1-.76-9.58,19.82,19.82,0,0,1,6.87-11.84,50.44,50.44,0,0,1,4.23-2.91c-1.14-1.31-2.41-2.6-3.48-4a15.73,15.73,0,0,1-3.2-7.49c-.16-1.25-.39-2.5-.44-3.76a2.56,2.56,0,0,1,2.6-2.6A19.27,19.27,0,0,1,27.93,16.49c.44,1,.73,1,1.36.25A34.45,34.45,0,0,1,44.14,6.53,33,33,0,0,1,50.9,5a45.22,45.22,0,0,1,8.2-.44,52,52,0,0,1,7.3,1.29A30,30,0,0,1,77.62,11,35.72,35.72,0,0,1,86.3,19.7a8.82,8.82,0,0,1,.54.79c.44.79,1,.9,1.92.73a16.34,16.34,0,0,1,6.69.7,19,19,0,0,1,7.37,3.78,20.42,20.42,0,0,1,5.44,7.19c1.78,3.62,1.81,7.51,1.36,11.34a17.34,17.34,0,0,1-3.4,7.93ZM87.82,56.41a21.47,21.47,0,0,0-.6-2.94,14.11,14.11,0,0,0-10.79-9.76c-2.63-.56-5.47-.1-8.32-.1a5,5,0,0,0,.2,1.47,26.85,26.85,0,0,0,2.36,4.39A13.46,13.46,0,0,0,81,55,19.24,19.24,0,0,1,87.82,56.41Zm-54.5-1.95c4.23.2,9.11-5.33,7.92-12.86-.48.19-.94.34-1.37.54a9.38,9.38,0,0,0-5.74,7.1C33.81,51,33.58,52.72,33.32,54.46ZM93.49,66.06c3.3-.66,6.76-.26,9.52-2.59a11,11,0,0,0,3.35-5C100.85,56.83,93.3,61.22,93.49,66.06ZM23.71,21c-.13-4.47-6.52-10.49-10.42-10.28C13.39,14.86,19.22,21.29,23.71,21Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef2 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M89.68,115.21A35,35,0,0,1,81,126.91,36.34,36.34,0,0,1,66.64,135a37.55,37.55,0,0,1-14,1.2,34.27,34.27,0,0,1-17.44-6.69,36.84,36.84,0,0,1-11.51-13.77c-.37-.77-.71-.5-1.13,0a10,10,0,0,1-4.86,3.22c-1.39.38-2.82,1.18-4.37.37a2.57,2.57,0,0,1-1.61-2.5c0-3,0-6,0-9a10.67,10.67,0,0,1,3-7.05c.56-.65.65-1,0-1.63a10.45,10.45,0,0,1-3-9.4,10.59,10.59,0,0,1,6.43-8.32,14.12,14.12,0,0,1,4.34-1,2.58,2.58,0,0,1,2.74,2.67,2.63,2.63,0,0,1-2.75,2.54,5.83,5.83,0,0,0-5.55,4.67c-.4,3.7.9,5.49,3.84,6.76a12.56,12.56,0,0,0,2.41.43c1.63.34,2,1.59,2.15,3,.18,1.82.3,3.64.57,5.45a28.4,28.4,0,0,0,4.52,11.24,30.67,30.67,0,0,0,13.32,11.28A29.84,29.84,0,0,0,60.08,131,30.88,30.88,0,0,0,81,119.42a27.27,27.27,0,0,0,5.87-12.19,53.61,53.61,0,0,0,.9-6.95,3,3,0,0,1,3-3.09c3.32,0,5.21-2.92,5.51-5.44a6,6,0,0,0-3.7-5.65,10.31,10.31,0,0,0-2.29-.47,2.63,2.63,0,0,1,0-5.25,10.85,10.85,0,0,1,8,3.44,10.61,10.61,0,0,1,3.16,7.68A10.49,10.49,0,0,1,98.45,99c-.68.69-.85,1.13-.07,1.87a10.65,10.65,0,0,1,3.17,7.69c.1,2.56,0,5.12,0,7.68s-2.25,3.78-4.44,3.15a14.6,14.6,0,0,1-5.5-2.58Zm6.5-1.75c.49-5,.15-8.81-3.44-10.16.24,2.54.32,4.95.76,7.29A3.92,3.92,0,0,0,96.18,113.47ZM19.81,103.38a4.8,4.8,0,0,0-2.66,3.52,59.45,59.45,0,0,0-.06,6.45C19.77,112.05,21.23,106.6,19.81,103.38Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef3 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M56.57,71.89H80.93c2.61,0,3.55.92,3.56,3.49,0,2.4-.06,4.8,0,7.2s.92,4.55,3.29,5.64a10.56,10.56,0,0,0,2.84.75,2.65,2.65,0,0,1,2.3,2,2.69,2.69,0,0,1-1.47,2.79c-1.54,1-3,.18-4.32-.22a10,10,0,0,1-6.74-5.93,20.76,20.76,0,0,1-1.14-4.82,28.71,28.71,0,0,1,0-4.43c0-.9-.24-1.39-1.23-1.25a3.43,3.43,0,0,1-.48,0H35.31c-1.61,0-1.61,0-1.62,1.65s0,3.36,0,5a10.47,10.47,0,0,1-7,9.45c-1,.3-1.93.62-2.9.86a3.31,3.31,0,0,1-3.4-1.61,2.63,2.63,0,0,1,1.12-3.3,16.44,16.44,0,0,1,3-.68,5.6,5.6,0,0,0,4-4.78c0-2.24.11-4.48,0-6.72-.21-4.52.92-5.24,5.25-5.19C41.38,72,49,71.89,56.57,71.89Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef4 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M56.61,119.64A20.55,20.55,0,0,1,43.06,114c-2-1.95-.93-4.14,1.26-4.64a2.62,2.62,0,0,1,2,.67,14.54,14.54,0,0,0,6.41,3.72,13.5,13.5,0,0,0,6.11.35,17.24,17.24,0,0,0,7.85-4c1.5-1.31,2.43-1.09,3.66-.06a2.46,2.46,0,0,1,0,3.75,32.51,32.51,0,0,1-5.15,3.68A20.39,20.39,0,0,1,56.61,119.64Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef5 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M59.09,18.84c0,1.58-1.14,2.65-3.06,2.62a17.3,17.3,0,0,0-9,2.43,18.37,18.37,0,0,0-6.8,6.5,4.78,4.78,0,0,1-1.61,1.66,2.39,2.39,0,0,1-3-.61,2.75,2.75,0,0,1-.13-3.19A24,24,0,0,1,46.67,18.3a23.35,23.35,0,0,1,9.67-2.05C58.12,16.24,59.35,17.35,59.09,18.84Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef6 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M64.78,91.45A4.33,4.33,0,0,1,69.34,87a4.64,4.64,0,0,1,4.59,4.57,4.8,4.8,0,0,1-4.67,4.61C67.13,96.14,64.51,94.19,64.78,91.45Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef7 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M39.39,91.36a4.48,4.48,0,0,1,4.7-4.43,4.6,4.6,0,1,1-.4,9.19A4.56,4.56,0,0,1,39.39,91.36Z" style="{fill:#60ad3a;}"/>' }
    }
    class chef8 extends mojs.CustomShape {
        getShape() { return '<path transform="scale(0.68)" d="M98.85,37.32a2.16,2.16,0,0,1-1.47,2.35c-1.06.35-2.34.47-3.09-.72A6,6,0,0,0,90,36.43a2.48,2.48,0,0,1-2.18-2.83,2.76,2.76,0,0,1,3-2.2,9.35,9.35,0,0,1,7.58,4.52A6.28,6.28,0,0,1,98.85,37.32Z" style="{fill:#60ad3a;}"/>' }
    }
    mojs.addShape('chef1', chef1);
    mojs.addShape('chef2', chef2);
    mojs.addShape('chef3', chef3);
    mojs.addShape('chef4', chef4);
    mojs.addShape('chef5', chef5);
    mojs.addShape('chef6', chef6);
    mojs.addShape('chef7', chef7);
    mojs.addShape('chef8', chef8);

    self.createChefShapes = ['chef2', 'chef7', 'chef5', 'chef6', 'chef1', 'chef4', 'chef3', 'chef8'].map((shapename, ind) => {
        let delay = 100;
        if(ind) {
            // delay *= (ind)/8;
        }
        return(obj) => {
            return new mojs.Shape({
                shape: shapename,
                // left: '50%',
                // fill: 'none',
                fill: secondary_color_shift,
                radius: { 40: 60 },
                stroke: tertiary_color_shift,
                // strokeWidth: { 6: 0 },
                // strokeDasharray: '100%',
                // strokeDashoffset: { '100%': '200%' },
                // angle: { 0: 18 },
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
                stroke: tertiary_color_shift2,
                // strokeWidth: { 6: 0 },
                // strokeDasharray: '100%',
                // strokeDashoffset: { '100%': '200%' },
                // angle: { 0: 18 },
                repeat: 999,
                delay,
                // isShowStart: true,
                duration: 1000,
                ...obj,
            })
        }
    })
    self.createRect = (obj) => {
        return new mojs.Timeline({}).add([
            // self.createRectShape(obj),
            self.createChefShapes[0](obj),
            self.createChefShapes[1](obj),
            self.createChefShapes[2](obj),
            self.createChefShapes[3](obj),
            self.createChefShapes[4](obj),
            self.createChefShapes[5](obj),
            self.createChefShapes[6](obj),
            self.createChefShapes[7](obj),
            // self.createShapeSwirl(obj),
            // self.createShapeSwirl2(obj),
            // self.createShapeCircle(obj)
        ])
    };

    self.initLoader = (obj = {}) => {
        if(!self.loader) {
            self.loader = self.createRect(obj);
        }

        return self.loader
    }
    
    self.loading_count = 0;
    self.startLoading = () => {
        self.loader && !self.loading && self.loader.replay();
        self.loading = true;
        self.loading_count++;
    }

    self.stopLoading = () => {
        let load_count = self.loading_count;
        if(self.loader && self.loading) {
            $timeout(() => {
                console.log(load_count , self.loading_count);
                if(load_count != self.loading_count){
                    return;
                }
                self.loading = false;
                self.loader.pause();
                self.loader.reset();
                self.loader.setProgress(0);
                $timeout(() => {
                    self.loader.setProgress(0);
                }, 10);
            }, 500);
        }
    }

    Object.defineProperty($window, 'startloading', { get: function() { return self.startLoading() } })
    Object.defineProperty($window, 'stoploading', { get: function() { return self.stopLoading() } })
    return self;
};

export default MymoFactory;