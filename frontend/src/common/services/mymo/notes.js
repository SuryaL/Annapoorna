

/** open background modal
 *     // let tm = null;
    // const delayedShow = () => {
    //     clearTimeout( tm );
    //     tm = setTimeout(function () {
    //        openTimeline.replay();               
    //     }, 1000);
    //   }
      
    // self.openBackground = (obj) => new mojs.Shape({
    //     ...obj,
    //     fill: '#FC2D79', 
    //     scale: { 0: 4.5 },
    //     isForce3d: true,
    //     isTimelineLess: true,
    //     radius: 200,
    //     easing: 'cubic.out',
    //     backwardEasing: 'expo.in',
    //     duration: 2000,
    //     onStart (isForward) {
    //     //   !isForward && delayedShow();
    //     }
    //  });
     
    //  const openTimeline = new mojs.Timeline({ speed: 1.25 });
    //   openTimeline
    //   .add(self.openBackground({parent: 'app'}))

    //   openTimeline.play()
    // //   openTimeline.replayBackward()
    

    // // SOURCE
    const DURATION = 400;

let tm = null;
const delayedShow = () => {
  clearTimeout( tm );
  tm = setTimeout(function () {
     openTimeline.replay();               
  }, 1000);
}

// OPEN
const openBackground = new mojs.Shape({
   fill: '#FC2D79', 
   scale: { 0: 4.5 },
   isForce3d: true,
   isTimelineLess: true,
   radius: 200,
   easing: 'cubic.out',
   backwardEasing: 'expo.in',
   duration: 2*DURATION,
   onStart (isForward) {
     !isForward && delayedShow();
   }
});

const V_OPTS = {
  fill:     'none',
  stroke:   'white',
  isTimelineLess: true
}

const circle = new mojs.Shape({
  ...V_OPTS,
  left: '75%', top: '25%',
  radius:       { 0 : 15 },
  easing:       'cubic.out',
  strokeWidth:  { 10 : 0 },
  duration:     1.5*DURATION,
  className:    'close-button'
});

const x = new mojs.Shape({
  ...V_OPTS,
  parent:       circle.el,
  shape:    'cross',
  radius:   { 0: 8 },
  angle:    45,
  // easing:   'cubic.out',
  duration: DURATION,
  delay:   .4*DURATION,
});

const burst = new mojs.Burst({
  parent: circle.el,
  radius:     { 0: 30 },
  children: {
    ...V_OPTS,
    shape: 'line',
    scaleY:  1,
  }
});

const BUBBLE_OPTS = {
  ...V_OPTS,
  parent:         circle.el,
  strokeWidth:    {5:0},
}

const bubbleTimeline = new mojs.Timeline({ delay: .7*DURATION });

const bubble1 = new mojs.Shape({
  ...BUBBLE_OPTS,
  radius:   { 0: 10 },
  left: 0, top: '-15%'
});

const bubble2 = new mojs.Shape({
  ...BUBBLE_OPTS,
  radius:   { 0: 6 },
  delay:    .4*DURATION,
  left: '70%', top: 0
});

const bubble3 = new mojs.Shape({
  ...BUBBLE_OPTS,
  radius:   { 0: 4 },
  delay:    .2*DURATION,
  left: '50%', top: '100%'
});

bubbleTimeline.add(  bubble1, bubble2, bubble3 );

const openTimeline = new mojs.Timeline({ speed: 1.25 });

const closeButtonTimeline = new mojs.Timeline({ delay: DURATION/2 });

closeButtonTimeline
  .add(
    x, circle, burst,
    bubbleTimeline
  );

openTimeline
  .add(
    openBackground,
    closeButtonTimeline
);

// CLOSE
const closeCircle = new mojs.Shape({
  ...V_OPTS,
  left: '75%', top: '25%',
  radius:       { 0 : 15 },
  easing:       'cubic.out',
  strokeWidth:  { 5 : 0 },
  duration:     1.5*DURATION,
  className:    'close-button',
  isShowEnd:    false
});

const FADE_OPTS = {
  parent:     closeCircle.el,
  y:          { 0 : -100 },
  fill:       'white',
  // opacity:    { 1: 0 },
  pathScale:  'rand(0.25, .75)',
  radius:     'rand(12, 15)',
  scale:      { 1: 0 },
  delay:      'rand(0, 100)',
  isForce3d:  true,
  duration:   1.5*DURATION,
  swirlSize:  'rand(10, 15)',
  swirlFrequency: 'rand(2, 4)'
}

const fadeTimeline = new mojs.Timeline({ delay: .15*DURATION });
for ( let i = 0; i< 3; i++ ) {
  fadeTimeline.add(
    new mojs.ShapeSwirl({
      ...FADE_OPTS,
      direction: ( i % 2  === 0 ) ? 1 : -1
    })
  );
}

const closeX = new mojs.Shape({
  ...V_OPTS,
  parent:       closeCircle.el,
  shape:        'cross',
  radius:       { 8: 0 },
  angle:        45,
  duration:     DURATION,
  delay:        .4*DURATION,
  isShowStart:  true
});

const closeTimeline = new mojs.Timeline();
closeTimeline
  .add(
    closeX, closeCircle,
    fadeTimeline
);

openTimeline.replay();
circle.el.addEventListener( 'click', function () {
  circle._hide();
  openTimeline.stop();
  closeTimeline.replay();
  openBackground.replayBackward();
});

 */