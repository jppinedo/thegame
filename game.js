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

// ---------------------------------------------------------------------
// --------------------------- DECLARATIONS ----------------------------
// ---------------------------------------------------------------------

var canvas = document.getElementById('game-canvas'),
   context = canvas.getContext('2d'),

// Constants............................................................

   PLATFORM_HEIGHT = 20, 
   PLATFORM_WIDTH =  20,

   STARTING_RUNNER_LEFT = 50,
   STARTING_RUNNER_TRACK = 1,

// Track baselines...................................................

   TRACK_1_BASELINE = 323,
   TRACK_2_BASELINE = 223,
   TRACK_3_BASELINE = 123,


// Background translating.............................................

   STARTING_BACKGROUND_VELOCITY = 42,
   STARTING_PLATFORM_OFFSET = 0,
   STARTING_BACKGROUND_OFFSET = 0,

// Translation offsets...............................................
   
   backgroundOffset = STARTING_BACKGROUND_OFFSET,
   platformOffset = STARTING_PLATFORM_OFFSET,


// Fps indicator.....................................................
   
   fpsElement = document.getElementById('fps'),

// Images............................................................
   
   background  = new Image(),
   runnerImage = new Image(),
   grassTile = new Image(),
   woodTile = new Image(),

// Time..............................................................
   
   lastAnimationFrameTime = 0,
   lastFpsUpdateTime = 0,
   fps = 60,

// Velocities........................................................

   bgVelocity = STARTING_BACKGROUND_VELOCITY,
   platformVelocity,  

// Platforms.........................................................

   platformData = [  // One screen for now
      // Screen 1.......................................................
      {
         left:      10,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      30,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      50,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      70,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      90,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      110,
         top:       323, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      190,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      210,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      230,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      250,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      270,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      290,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      310,
         top:       223, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   grassTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      410,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      430,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      450,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      470,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      490,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      },
      {
         left:      510,
         top:       123, 
         width:     PLATFORM_WIDTH,
         height:    PLATFORM_HEIGHT,
         texture:   woodTile, 
         opacity:   1,
         track:     1,
         pulsate:   false,
      }


   ];

// ------------------------- INITIALIZATION ----------------------------

function initializeImages() {
   background.src = 'images/background_level_forest.png';
   runnerImage.src = 'images/runner.png';
   grassTile.src = 'images/grass_tile.png';
   woodTile.src = 'images/wood_tile.png';

   background.onload = function (e) {
      startGame();    // Start the animation
   };
}


function calculatePlatformTop(track) {
   var top;

   if      (track === 1) { top = TRACK_1_BASELINE; }
   else if (track === 2) { top = TRACK_2_BASELINE; }
   else if (track === 3) { top = TRACK_3_BASELINE; }

   return top;
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

function drawBackground() {
   context.translate(-backgroundOffset, 0);

   // Initially onscreen:
   context.drawImage(background, 0, 0);

   // Initially offscreen:
   context.drawImage(background, background.width, 0);

   context.translate(backgroundOffset, 0);
}

function drawPlatforms() {
   var pd, top;

   context.save(); // Save context attributes
   
   for (var i=0; i < platformData.length; ++i) {
      pd = platformData[i];
      top = calculatePlatformTop(pd.track);

      context.globalAlpha = pd.opacity;

      // If you switch the order of the following two
      // calls, you get a different effect.

      context.drawImage(pd.texture, pd.left, pd.top);
   }

   context.restore(); // Restore context attributes
}



function drawRunner() {
   context.drawImage(runnerImage,
      STARTING_RUNNER_LEFT,
      calculatePlatformTop(STARTING_RUNNER_TRACK) - runnerImage.height);
}

function draw(now) {
   setBackgroundOffset();
   drawBackground();
   drawPlatforms();
   drawRunner();
}

function animate(time) {  
   fps = calculateFps(time);         
   draw(time);
   //console.log(time);                     
   requestAnimationFrame(animate); 
};

function calculateFps(now) {
   var fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      fpsElement.innerHTML = fps.toFixed(0) + ' fps';
   }
   return fps; 
}
function startGame() {
   requestNextAnimationFrame(animate);
}
 


// Launch game.........................................................

initializeImages();
