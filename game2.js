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
var Reptiliano =  function () {
// ---------------------------------------------------------------------
// --------------------------- DECLARATIONS ----------------------------
// ---------------------------------------------------------------------

   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),

   // HTML elements........................................................
   
   this.fpsElement = document.getElementById('fps'),
   this.toast = document.getElementById('toast'),

    // Constants............................................................

   this.LEFT = 1,
   this.RIGHT = 2,
   this.STATIONARY = 3,


   // Constants are listed in alphabetical order from here on out
   
   this.BACKGROUND_VELOCITY = 42,
   this.DEFAULT_TOAST_TIME = 1000,

   this.PAUSED_CHECK_INTERVAL = 200,

   this.PLATFORM_HEIGHT = 20,
   this.PLATFORM_WIDTH =  20,
   this.PLATFORM_STROKE_WIDTH = 2,
   this.PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.

   this.RUNNER_HEIGHT = 43,
   
   this.STARTING_BACKGROUND_VELOCITY = 42,
   this.STARTING_BACKGROUND_OFFSET = 0,

   this.STARTING_RUNNER_LEFT = 50,
   this.STARTING_RUNNER_VELOCITY = 0,

    // Paused............................................................
   
   this.paused = false,
   this.pauseStartTime = 0,
   this.totalTimePaused = 0,

   this.windowHasFocus = true,

   // Track baselines...................................................

   this.TRACK_1_BASELINE = 323,
   this.TRACK_2_BASELINE = 223,
   this.TRACK_3_BASELINE = 123,

   // Fps indicator.....................................................
   
   this.fpsToast = document.getElement

   // Images............................................................
      
      this.background  = new Image(),
      this.runnerImage = new Image(),
      this.grassTile = new Image(),
      this.woodTile = new Image(),


   // Time..............................................................
   
   this.lastAnimationFrameTime = 0,
   this.lastFpsUpdateTime = 0,
   this.fps = 60,


   // Constants............................................................

      this.STARTING_RUNNER_LEFT = 50,
      this.STARTING_RUNNER_TRACK = 1,

   // Translation offsets...............................................
      
      this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
      this.platformOffset = this.STARTING_PLATFORM_OFFSET,

   // Images............................................................
      
      this.background  = new Image(),
      this.runnerImage = new Image(),
      this.grassTile = new Image(),
      this.woodTile = new Image(),

   // Time..............................................................
      
      this.lastAnimationFrameTime = 0,
      this.lastFpsUpdateTime = 0,
      this.fps = 60,

   // Runner track......................................................

   this.runnerTrack = this.STARTING_RUNNER_TRACK,

   // Pageflip timing for runner........................................

   this.runnerPageflipInterval = this.STARTING_PAGEFLIP_INTERVAL,
   
   // Scrolling direction...............................................

   this.scrollingDirection = this.STATIONARY,
   
   // Translation offsets...............................................

   this.backgroundOffset = this.player,
   this.platformOffset = this.STARTING_PLATFORM_OFFSET,

   // Velocities........................................................

   this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
   this.platformVelocity,


   // Platforms.........................................................

      this.platformData = [  // One screen for now
         // Screen 1.......................................................
         {
            left:      10,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      30,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      50,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      70,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      90,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      110,
            top:       323, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      190,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      210,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      230,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      250,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      270,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      290,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      310,
            top:       223, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.grassTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      410,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      430,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      450,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      470,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      490,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         },
         {
            left:      510,
            top:       123, 
            width:     this.PLATFORM_WIDTH,
            height:    this.PLATFORM_HEIGHT,
            texture:   this.woodTile, 
            opacity:   1,
            track:     1,
            pulsate:   false,
         }


      ];

};

// ------------------------- INITIALIZATION ----------------------------

Reptiliano.prototype = {

   draw: function(now) {
      this.setBackgroundOffset();
      this.drawBackground();
      this.drawPlatforms();
      this.drawRunner();
   },
   drawRunner: function() {
      this.context.drawImage(this.runnerImage, this.STARTING_RUNNER_LEFT, this.TRACK_1_BASELINE - this.runnerImage.height);
   },
   drawPlatforms: function() {
      var pd;

      this.context.save(); // Save context attributes
      
      for (var i=0; i < this.platformData.length; ++i) {
         pd = this.platformData[i];

         this.context.globalAlpha = pd.opacity;

         // If you switch the order of the following two
         // calls, you get a different effect.

         this.context.drawImage(pd.texture, pd.left, pd.top);
      }

      this.context.restore(); // Restore context attributes
   },
   setBackgroundOffset: function() {
      var offset = this.backgroundOffset + this.bgVelocity/this.fps;

      if (offset > 0 && offset < this.background.width) {
         this.backgroundOffset = offset;
      }
      else {
         this.backgroundOffset = 0;
      }
   },
   drawBackground: function() {
      this.context.save();

      this.context.translate(-this.backgroundOffset, 0);
      // Initially onscreen:
      this.context.drawImage(this.background, 0, 0), this.background.width, this.background.height;

      // Initially offscreen:
      this.context.drawImage(this.background, this.background.width, 0, this.background.width+1, this.background.height);

      this.context.restore();
   },
   calculateFps: function(now) {
      var fps = 1000 / (now - this.lastAnimationFrameTime);
      this.lastAnimationFrameTime = now;

      if (now - this.lastFpsUpdateTime > 1000) {
         this.lastFpsUpdateTime = now;
         this.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
      }
      return fps; 
   },
   turnLeft: function () {
      this.bgVelocity = -this.BACKGROUND_VELOCITY;
   },
   turnRight: function () {
      this.bgVelocity = this.BACKGROUND_VELOCITY;
   },
   splashToast: function (text, howLong) {
      howLong = howLong || this.DEFAULT_TOAST_TIME;

      this.toast.style.display = 'block';
      this.toast.innerHTML = text;

      setTimeout( function (e) {
         if (reptiliano.windowHasFocus) {
            this.toast.style.opacity = 1.0; // After toast is displayed
         }
      }, 50);

      setTimeout( function (e) {
         if (reptiliano.windowHasFocus) {
            this.toast.style.opacity = 0; // Starts CSS3 transition
         }

         setTimeout( function (e) { 
            if (reptiliano.windowHasFocus) {
               this.toast.style.display = 'none'; 
            }
         }, 480);
      }, howLong);
   },

   // Pause................................................................

   togglePaused: function () {
      var now = +new Date();

      this.paused = !this.paused;
   
      if (this.paused) {
         this.pauseStartTime = now;
      }
      else {
         this.lastAnimationFrameTime += (now - this.pauseStartTime);
      }
   },
   animate: function(time) {  
      if (reptiliano.paused) {
         setTimeout( function () {
            requestNextAnimationFrame(reptiliano.animate);
         }, reptiliano.PAUSED_CHECK_INTERVAL);
      }
      else {
         reptiliano.fps = reptiliano.calculateFps(time); 
         reptiliano.draw(time);
         requestNextAnimationFrame(reptiliano.animate);
      }
   },
   start: function () {
      this.turnRight();
      reptiliano.splashToast('Descubre tu camino.', 2000);

      requestNextAnimationFrame(reptiliano.animate);
   },
   initializeImages: function () {
      this.background.src = 'images/background_level_forest.png';
      this.runnerImage.src = 'images/runner.png';
      this.grassTile.src = 'images/grass_tile.png';
      this.woodTile.src = 'images/wood_tile.png';
   
      this.background.onload = function (e) {
         reptiliano.start();
      };
   }
};

// 
var Sprite = function (type, artist, behaviors) { // constructor
   this.type = type || '';
   this.artist = artist || undefined;
   this.behaviors = behaviors || [];
 
   this.left = 0;
   this.top = 0;
   this.width = 10;   // Something other than zero, which makes no sense
   this.height = 10;  // Something other than zero, which makes no sense
   this.velocityX = 0;
   this.velocityY = 0;
   this.opacity = 1.0;
   this.visible = true;
 
   return this;
};

Sprite.prototype = { // methods
   draw: function (context) {
     context.save();
 
     // Calls to save() and restore() make the globalAlpha setting temporary
 
     context.globalAlpha = this.opacity; 
       
     if (this.artist && this.visible) {
        this.artist.draw(this, context);
     }
 
     context.restore();
   },
 
   update: function (time, fps) {
      for (var i=0; i < this.behaviors.length; ++i) {
         if (this.behaviors[i] === undefined) { // Modified while looping?
            return;
         }
 
         this.behaviors[i].execute(this, time, fps);
      }
   }
};

// ImageArtists draw an image
 
var ImageArtist = function (imageUrl) { // constructor
   this.image = new Image();
   this.image.src = imageUrl;
};
 
ImageArtist.prototype = { // methods
   draw: function (sprite, context) {
      context.drawImage(this.image, sprite.left, sprite.top);
   }
};

// Sprite sheet artists draw an image from a sprite sheet
 
SpriteSheetArtist = function (spritesheet, cells) { // constructor
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};
 
SpriteSheetArtist.prototype = { // methods
   advance: function () {
      if (this.cellIndex == this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex++;
      }
   },
    
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
 
      context.drawImage(this.spritesheet,
               cell.left,   cell.top,     // source x, source y
               cell.width,  cell.height,  // source width, source height
               sprite.left, sprite.top,   // destination x, destination y
               cell.width,  cell.height); // destination width, destination height
   }
};

var REPT_CELLS_SIZE = 60,
 
    // Spritesheet cells................................................
 
    reptCells = [
       { left: 0,   top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 60,  top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 120,  top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 180, top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 240, top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 300, top: 0, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 0, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 60, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 120, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 180, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 240, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
       { left: 3000, top: 60, width: REPT_CELLS_SIZE, height: REPT_CELLS_SIZE },
    ];


// Event handlers.......................................................

window.onkeydown = function (e) {
   var key = e.keyCode;

   if (key === 80 || (reptiliano.paused && key !== 80)) {  // 'p'
      reptiliano.togglePaused();
   }
   
   if (key === 68 || key === 37) { // 'd' or left arrow
      reptiliano.turnLeft();
   }
   else if (key === 75 || key === 39) { // 'k'or right arrow
      reptiliano.turnRight();
   }
   else if (key === 74) { // 'j'
      if (reptiliano.runnerTrack === 3) {
         return;
      }

      reptiliano.runnerTrack++;
   }
   else if (key === 70) { // 'f'
      if (reptiliano.runnerTrack === 1) {
         return;
      }

      reptiliano.runnerTrack--;
   }
};

window.onblur = function (e) {  // pause if unpaused
   reptiliano.windowHasFocus = false;
   
   if (!reptiliano.paused) {
      reptiliano.togglePaused();
   }
};

window.onfocus = function (e) {  // unpause if paused
   var originalFont = reptiliano.toast.style.fontSize;

   reptiliano.windowHasFocus = true;

   if (reptiliano.paused) {
      reptiliano.toast.style.font = '128px fantasy';

      reptiliano.splashToast('3', 500); // Display 3 for one half second

      setTimeout(function (e) {
         reptiliano.splashToast('2', 500); // Display 2 for one half second

         setTimeout(function (e) {
            reptiliano.splashToast('1', 500); // Display 1 for one half second

            setTimeout(function (e) {
               if ( reptiliano.windowHasFocus) {
                  reptiliano.togglePaused();
               }

               setTimeout(function (e) { // Wait for '1' to disappear
                  reptiliano.toast.style.fontSize = originalFont;
               }, 2000);
            }, 1000);
         }, 1000);
      }, 1000);
   }
};

// Launch game.........................................................

var reptiliano = new Reptiliano();
reptiliano.initializeImages();