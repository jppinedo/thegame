/*
 * Copyright (C) 2012 David Geary. This code is from the book
 * Core HTML5 Canvas, published by Prentice-Hall in 2012.
 *
 * License:
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * The Software may not be used to create training material of any sort,
 * including courses, books, instructional videos, presentations, etc.
 * without the express written consent of David Geary.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/
var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d'),

// Constants............................................................

   LEFT = 1,
   RIGHT = 2,

   // Constants are listed in alphabetical order from here on out
   
   BACKGROUND_VELOCITY = 42,

   PAUSED_CHECK_INTERVAL = 200,

   PLATFORM_HEIGHT = 8,  
   PLATFORM_STROKE_WIDTH = 2,
   PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.

   PLATFORM_VELOCITY_MULTIPLIER = 4.35,

   RUNNER_HEIGHT = 43,
   
   STARTING_BACKGROUND_VELOCITY = 0,

   STARTING_PLATFORM_OFFSET = 0,
   STARTING_BACKGROUND_OFFSET = 0,

   // Runner's Position...................................................
   STARTING_RUNNER_LEFT = 50,
   STARTING_RUNNER_TRACK = 1,

   // Track baselines...................................................

   TRACK_1_BASELINE = 323,
   TRACK_2_BASELINE = 223,
   TRACK_3_BASELINE = 123,

   // Fps indicator.....................................................
   
   fpsElement = document.getElementById('fps'),

   // Images............................................................
   
   background  = new Image(),
   runnerImage = new Image(),

   // Time..............................................................
   
   lastAnimationFrameTime = 0,
   lastFpsUpdateTime = 0,
   fps = 60,

   // Runner track......................................................

   runnerTrack = STARTING_RUNNER_TRACK,
   
   // Translation offsets...............................................
   
   backgroundOffset = STARTING_BACKGROUND_OFFSET,
   platformOffset = STARTING_PLATFORM_OFFSET,

   // Velocities........................................................

   bgVelocity = STARTING_BACKGROUND_VELOCITY,
   platformVelocity,

   // Platforms.........................................................

   platformData = [
      // Screen 1.......................................................
      {
         left:      10,
         width:     230,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(150,190,255)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      250,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(150,190,255)',
         opacity:   1.0,
         track:     2,
         pulsate:   false,
      },

      {  left:      400,
         width:     125,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,0,0)',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      633,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 2.......................................................
               
      {  left:      810,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1025,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1200,
         width:     125,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      1400,
         width:     180,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 3.......................................................
               
      {  left:      1625,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1800,
         width:     250,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false
      },

      {  left:      2000,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,80)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      2100,
         width:     100,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
      },


      // Screen 4.......................................................

      {  left:      2269,
         width:     200,
         height:    PLATFORM_HEIGHT,
         fillStyle: 'gold',
         opacity:   1.0,
         track:     1,
      },

      {  left:      2500,
         width:     200,
         height:    PLATFORM_HEIGHT,
         fillStyle: '#2b950a',
         opacity:   1.0,
         track:     2,
         snail:     true
      },
   ];

// ---------------------------- FUNCTIONS ------------------------------ 

// Drawing..............................................................

function drawRunner() {
   context.drawImage(runnerImage,
                     STARTING_RUNNER_LEFT,
                     calculatePlatformTop(runnerTrack) - RUNNER_HEIGHT);
}

function drawPlatforms() {
   var pd, top;

   context.save();
   context.translate(-platformOffset, 0);
   
   for (var i=0; i < platformData.length; ++i) {
      pd = platformData[i];
      top = calculatePlatformTop(pd.track);

      context.lineWidth = PLATFORM_STROKE_WIDTH;
      context.strokeStyle = PLATFORM_STROKE_STYLE;
      context.fillStyle = pd.fillStyle;
      context.globalAlpha = pd.opacity;

      context.strokeRect(pd.left, top, pd.width, pd.height);
      context.fillRect  (pd.left, top, pd.width, pd.height);
   }
   context.restore();
}

function draw() {
   setPlatformVelocity();
   setOffsets();

   drawBackground();

   drawRunner();
   drawPlatforms();
}

function setPlatformVelocity() {
   platformVelocity = bgVelocity * PLATFORM_VELOCITY_MULTIPLIER; 
}

function setOffsets() {
   setBackgroundOffset();
   setPlatformOffset();
}

function setBackgroundOffset() {
   var offset = backgroundOffset + bgVelocity/fps;

   if (offset > 0 && offset < background.width) {
      backgroundOffset = offset;
   }
   else {
      backgroundOffset = 0;
   }
}

function setPlatformOffset() {
   platformOffset += platformVelocity/fps;

   if (platformOffset > 2*background.width) {
      turnLeft();
   }
   else if (platformOffset < 0) {
      turnRight();
   }
}

function drawBackground() {
   context.translate(-backgroundOffset, 0);

   // Initially onscreen:
   context.drawImage(background, 0, 0);

   // Initially offscreen:
   context.drawImage(background, background.width, 0);

   context.translate(backgroundOffset, 0);
}

function calculateFps(now) {
   var fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      fpsElement.innerHTML = fps.toFixed(0) + ' fps';
   }
   return fps; 
}

function calculatePlatformTop(track) {
   var top;

   if      (track === 1) { top = TRACK_1_BASELINE; }
   else if (track === 2) { top = TRACK_2_BASELINE; }
   else if (track === 3) { top = TRACK_3_BASELINE; }

   return top;
}

function turnLeft() {
   bgVelocity = -BACKGROUND_VELOCITY;
}

function turnRight() {
   bgVelocity = BACKGROUND_VELOCITY;
}
   
// Animation............................................................

function animate(now) { 
   fps = calculateFps(now); 
   draw();
   requestNextAnimationFrame(animate);
}

// ------------------------- INITIALIZATION ----------------------------

function initializeImages() {
   background.src = 'images/background_level_one_dark_red.png';
   runnerImage.src = 'images/runner.png';

   background.onload = function (e) {
      startGame();
   };
}

function startGame() {
   window.requestNextAnimationFrame(animate);
}

// Launch game.........................................................

initializeImages();

setTimeout( function (e) {
   turnRight();
}, 1000);
