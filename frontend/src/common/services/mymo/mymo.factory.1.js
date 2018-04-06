/**
 * USAGE onInit of '.measured-view-loading .spin-wrap' selector element
 * 
 *         
    $timeout(()=>{
          let rect = Mymo.createRect({
            parent:'.measured-view-loading .spin-wrap'
          });
          $scope.$watch('myloading',(newV)=>{
              if(newV!=null || newV!=undefined){
                  if(!!newV){
                      $scope.rect_timeout && $timeout.cancel($scope.rect_timeout);
                      rect.replay();
                  }else{
                      // rect.reset();
                      //rect.reset();
  //                  rect.setProgress(0);
//rect.setProgress(0);
                      $scope.rect_timeout = $timeout(()=>rect.pause(),1000);
                  }
              }
          })     
        })
 */


 // npm install mo-js
import mojs from 'mo-js/build/mo.min';
let MymoFactory = function() {
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
        getShape() { return '<path  transform="scale(0.68)" d="M72 7.4c0 .7-3.1 11-6.8 22.7-7.9 24.5-8.5 26.8-7.4 27 .4 0 5-3.2 10.2-7 8.7-6.5 9.9-7 14.4-7 3.4 0 5.6-.5 4.4-1.4L81 23.3C76.6 9.7 76 6.1 73.8 6.1c-1 0-1.8.5-1.8 1.3z"/>'}
    }
    class rstar2 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M68.3 63.1C62.9 67 57.7 72 52.5 75.3c-4.8 4.2-5.6 2.5 10.4 23l11.6 14.8 19 13.7c22.5 16.3 24.4 17.6 25.2 16.7.7-.7.2-2.2-9.9-33.8l-6-18.8-2.8-1-10.1-2.2-5.5-1.1-4.4 4-7 4.5s-6-5.9-6-6.9c0-.4 2.8-3 6.3-5.7C86 72.3 89 69.2 89 65.3c0-4.1-4.5-11.2-7.1-11.2-1 0-7.1 4-13.6 9z"/>'}
    }
    class rstar3 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M4 59.3c0 2.2 34 28.1 36 27.4.6-.2-.3-2-1-4.3a10.7 10.7 0 0 1-4-5 159 159 0 0 1 19.6-16.8c3.9-2.2-.1-2.7-24.6-2.7-21.3 0-26 .2-26 1.4z"/>'}
    }
    class rstar4 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M99 64.8c0 4.8-.6 7.8-2 10.5a21 21 0 0 0-2 4.5c0 1.4 14.4 4.6 17.2 3.9a160 160 0 0 0 28.6-20c5.8-5.6 5.5-5.4-19.3-5.5H99v6.6z"/>'}
    }
    class rstar5 extends mojs.CustomShape {
        getShape() { return '<path  transform="scale(0.68)" d="M45 95.6a438 438 0 0 0-16 47c0 2.2 1.6 1.3 12.2-6.3 19-13.6 24.8-17.6 23.6-19a211 211 0 0 0-18.5-23.4c-.7 0-1.6.8-1.3 1.7z"/>'}
    }
    mojs.addShape('rstar1', rstar1); // passing name and Bubble class
    mojs.addShape('rstar2', rstar2); // passing name and Bubble class
    mojs.addShape('rstar3', rstar3); // passing name and Bubble class
    mojs.addShape('rstar4', rstar4); // passing name and Bubble class
    mojs.addShape('rstar5', rstar5); // passing name and Bubble class


    /* ADD CUSTOM SHAPE SOMEWHERE IN YOUR CODE */
    class Heart extends mojs.CustomShape {
        getShape() { return '<path d="M92.5939814,7.35914503 C82.6692916,-2.45304834 66.6322927,-2.45304834 56.7076029,7.35914503 L52.3452392,11.6965095 C51.0327802,12.9714696 48.9328458,12.9839693 47.6203869,11.6715103 L47.6203869,11.6715103 L43.2705228,7.35914503 C33.3833318,-2.45304834 17.3213337,-2.45304834 7.43414268,7.35914503 C-2.47804756,17.1963376 -2.47804756,33.12084 7.43414268,42.9205337 L29.7959439,65.11984 C29.7959439,65.1323396 29.8084435,65.1323396 29.8084435,65.1448392 L43.2580232,78.4819224 C46.9704072,82.1818068 52.9952189,82.1818068 56.7076029,78.4819224 L70.1696822,65.1448392 C70.1696822,65.1448392 70.1696822,65.1323396 70.1821818,65.1323396 L92.5939814,42.9205337 C102.468673,33.12084 102.468673,17.1963376 92.5939814,7.35914503 L92.5939814,7.35914503 Z"></path>'; }
        getLength() { return 200; } // optional
    }
    mojs.addShape('heart', Heart); // passing name and Bubble class

    class HeartCustom extends mojs.CustomShape{
        getShape(){return '<path d="M0,18.56c.08-.65.14-1.31.25-2C.93,12.53,2.41,8.86,5.58,6.06A13.76,13.76,0,0,1,13.36,2.6,17,17,0,0,1,26.53,6.87C27.78,7.91,29,9,30.28,10c.46-.5.88-1,1.31-1.43A19.17,19.17,0,0,1,40.87,3c8.2-2,15.26,2.33,17.93,9.62a21.86,21.86,0,0,1,1.12,9.17c-.4,5.7-2.74,10.65-5.92,15.27A55.92,55.92,0,0,1,43,48.81c-3.27,2.64-6.65,5.13-10,7.63a4.61,4.61,0,0,1-5.85,0A100.25,100.25,0,0,1,13.55,45.66a57.07,57.07,0,0,1-8.74-10.5A31.21,31.21,0,0,1,.36,23.79C.23,23,.17,22.24.08,21.46.06,21.3,0,21.15,0,21Q0,19.77,0,18.56Zm55,1.39a30.9,30.9,0,0,0-.44-4.1A10.11,10.11,0,0,0,40.19,8.54a16.38,16.38,0,0,0-7.61,7,8.58,8.58,0,0,1-.62.95,2.37,2.37,0,0,1-1.94,1,2.63,2.63,0,0,1-2.13-1.22c-.42-.58-.8-1.18-1.21-1.77A16.71,16.71,0,0,0,20.3,8.79a11.05,11.05,0,0,0-6.6-1.14A9.35,9.35,0,0,0,6.65,12.8a15.45,15.45,0,0,0-1.44,9.48A24.52,24.52,0,0,0,8.1,30.93a45,45,0,0,0,7.53,9.74A95.21,95.21,0,0,0,29.52,52.06a.75.75,0,0,0,1.1,0l2.19-1.67c3.32-2.52,6.68-5,9.76-7.82a44.88,44.88,0,0,0,9.38-11.65A22.61,22.61,0,0,0,55,19.95Z"></path>'}
    }
    mojs.addShape('eadesheart', HeartCustom); // passing name and Bubble class
    self.createHeartShape = (obj) => {
        return new mojs.ShapeSwirl({
            shape: 'heart',
            left: '50%',
            fill: 'red',
            y: { 0: -100 },
            isSwirl: true,
            swirlSize: 20,
            radius: {0:50},
            stroke: 'red',
            strokeWidth: { 9: 5 },
            // strokeDasharray: '100%',
            // strokeDashoffset: { '100%': '300%' },
            easing:'sin.out',
            angle: { '-45': 30 },
            // repeat: 999,
            duration: 2000,
            opacity: { '0.9': 0.5 },
            ...obj,
        })
    }
    
    self.createSolidHeartShape = (obj) => {
        return new mojs.Shape({
            shape: 'heart',
            left: '50%',
            top:'68%',
            fill: 'red',
            // y: { 0: -100 },
            // isSwirl: true,
            // swirlSize: 20,
            radius: {'25':'20'},
            stroke: 'red',
            strokeWidth: { 9: 5 },
            // strokeDasharray: '100%',
            // strokeDashoffset: { '100%': '300%' },
            easing:'sin.in',
            // angle: { '-45': 30 },
            isShowStart: true,
            
            // repeat: 999,
            duration: 1000,
            opacity: { 1 : 0.95},
            ...obj,
        })
    }

    self.createHearts = (obj) => {
        return new mojs.Timeline({
            onPlaybackComplete () {
                console.log('here', this);
               
              }
        }).add([
            // self.createHeartShape(obj),
            self.createHeartShape({...obj,delay:0,radius: 50}),
            self.createHeartShape({...obj,delay:250,degreeShift: -15,swirlSize:15,angle: { '-95': 0 },radius: {0:30}}),
            self.createHeartShape({...obj,delay:600,degreeShift: 5,swirlSize:10,angle: { '-105': -30 },radius: {0:20}}),
            self.createHeartShape({...obj,delay:690,degreeShift: 10,swirlSize:40,angle: { '0': -30 },radius: {0:10}}),
            // self.createSolidHeartShape({...obj,delay:300}),
            
            // // self.createShapeCircle(obj)
        ])
    };

    self.createRectShape = (obj) => {
        return new mojs.Shape({
            shape: 'rect',
            left: '50%',
            fill: 'none',
            radius: 20,
            stroke: primary_color_shift,
            strokeWidth: { 9: 0 },
            strokeDasharray: '100%',
            strokeDashoffset: { '100%': '300%' },
            angle: { 0: 180 },
            repeat: 999,
            duration: 2000,
            ...obj,
        });
    }

    self.createStarShapes = ['rstar2','rstar5','rstar1','rstar4','rstar3'].map((shapename,ind)=>{
        return (obj) => {
            return new mojs.Shape({
                shape: shapename,
                // left: '50%',
                // fill: 'none',
                fill: secondary_color_shift,
                radius: {40: 60},
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
                radius: {40: 60},
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
    // console.log(self.rect);
    self.createShapeSwirl = (obj) => new mojs.ShapeSwirl({
        fill: primary_color_shift,
        y: { 0: -100 },
        isSwirl: true,
        swirlSize: 20,
        degreeShift: 110,
        pathScale: 0.8,
        swirlFrequency: 10,
        repeat: 999,
        duration: 2000,
        ...obj,
    });
    self.createShapeSwirl2 = (obj) => new mojs.ShapeSwirl({
        fill: primary_color_shift,
        y: { 0: -100 },
        isSwirl: true,
        swirlSize: 20,
        degreeShift: 20,
        pathScale: 0.8,
        swirlFrequency: 6,
        repeat: 999,
        duration: 2000,
        ...obj,

    });


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
    // self.createRect({}).play()

    self.grabAttentionBurst = (type, reduct = 1, incScale = 1, strokeScale= 1)  => (obj) => {
        let animarr = [];
        switch(type) {
            case 'yoyo':
                {
                    if(obj.parent && obj.animate_parent){
                        animarr.push(new mojs.Html({
                            el: obj.parent || null,
                            scale:{1:0.8},
                            duration:900,
                            delay:1100,
                            repeat:9999,
                            ...obj.animate_parent
                        }))
                    }
                    animarr.push(self.createYoyo({ ...obj, radius: 40/reduct, scale: { [1.3*incScale]: 0.7*incScale }, strokeWidth: { [1*strokeScale]: 2*strokeScale },opacity: { '0': 1 },}))
                    animarr.push(self.createYoyo({ ...obj, radius: 70/reduct, isYoyo: false, scale: { [0.4*incScale]: 1.4*incScale }, strokeWidth: { [2*strokeScale]: 1*strokeScale },duration: 1000, delay: 1000, opacity: { '0.6': 0 }, isShowEnd: false,  stroke: 'rgb(238, 42, 123)'}))
                    animarr.push(self.createYoyo({ ...obj, radius: 100/reduct, isYoyo: false, scale: { [0.2*incScale]: 1.8*incScale },  strokeWidth: {[ 2*strokeScale]: 1*strokeScale },duration: 1000, delay: 1000, opacity: { '0.8': 0 }, isShowEnd: false,  stroke: 'rgb(238, 42, 123)'}))
                    break;
                };
            case 'burst':
                {
                    animarr.push(self.createColorBurst(obj))
                    break;
                }
        }
        // console.log('new timeline');
        return new mojs.Timeline({}).add(animarr)
    }

    self.createYoyo = (obj) => new mojs.Shape({
        shape: 'circle',
        // fill:       'orange',
        radius: 40,
        // angle:      { [-120]: -40 },
        // x:          { [-200]: 20 },
        // y:          { [50]: -20 },
        scale: { 0.7: 1.3 },
        fill: 'transparent',
        stroke: { 'rgb(238, 42, 123)' : yellow_col },
        strokeWidth: { 2: 1 },
        repeat: 9999,
        duration: 1000,
        isYoyo: true,
        easing:'sin.out',
        backwardEasing: 'sin.in',
        isShowStart: false,
        isShowEnd: false,
        ...obj,
    })

    self.createColorBurst = (obj) => new mojs.Burst({
        radius: { 20: 40 },
        children: {
            fill: [yellow_col],
            repeat: 9999,
            duration: 1000
        },
        ...obj,
    });
    self.mainLoader = (scope, { mo_type, watchVariable, watchFunction, mo_opts } = {}) => {
        return $q((resolve) => {
        $timeout(() => {
        mo_opts = mo_opts || {};
        if(!mo_type){
            mo_type = 'createHearts';
        }
        // console.log(watchVariable , watchFunction, mo_opts, mo_type);
        let mo_obj = self[mo_type](mo_opts);
        let scope_watch = null;
        if(watchVariable || watchFunction) {
            scope_watch = scope.$watch(watchVariable || watchFunction, (newV) => {
                if(newV != null || newV != undefined) {
                    if(!!newV) {
                        // scope.mo_obj_timeout && $timeout.cancel(scope.mo_obj_timeout);
                        mo_obj.replay();
                    } else {
                        mo_obj.pause();
                        mo_obj.reset();
                        mo_obj.setProgress(0);
                        $timeout(() => {
                            mo_obj.setProgress(0);
                        }, 10);
                    }
                }
            })
        }
        resolve({
            mo_obj,
            mo_type,
            mo_opts,
            scope_watch
        })

    })
})

}

    // self.createBurst = (obj) => {
    //     return new mojs.Burst({
    //         ...obj,
    //         fill: 'none',
    //         degree: { 0: 360 },
    //         radius: { 0: 50 },
    //         repeat: 999,
    //         duration: 2000
    //     })
    // }
    // self.createShapeCircle = (obj) => {
    //     return new mojs.Shape({
    //         ...obj,
    //         shape: 'circle',
    //         radius: { 0:'70%' },
    //         opacity:{1:0},
    //         angle: -45 ,
    //         strokeDasharray: '100%',
    //         strokeDashoffset: { '100%': '90%' },
    //         count:0,
    //         stroke: primary_color_shift,
    //         fill: 'none',
    //         repeat: 999,
    //         duration:2000
    //     })
    // }
    // self.createShapeCircle = (obj) => {
    //     return new mojs.Shape({
    //         ...obj,
    //         shape: 'polygon',
    //         radius: { 25:'100%' },
    //         opacity:{1:0},
    //         count:20,
    //         angle: {'-360':360} ,
    //         strokeDasharray: '100%',
    //         strokeDashoffset: { '100%': '300%' },
    //         stroke: primary_color_shift,
    //         fill: 'none',
    //         repeat: 999,
    //         duration:2000
    //     })
    // }
    // self.createRect({}).play();
    return self;
};

export default MymoFactory;