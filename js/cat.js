"use strict";

var Cat = function Cat(x, y, game) {
  this.symbol = 'cat.png';
  this.x = x;
  this.y = y;
  this.timer = null;
  this.fatal = true;
	this.eventListeners = [];

	this.addEventListener(game);
}

Cat.prototype = {
  constructor: Cat,

	addEventListener: function(object) {
		this.eventListeners.push(object);
	},

	removeEventListener: function(object) {
		this.eventListener.splice(this.eventListeners.indexOf(object), 1);
	},

	raiseEvent: function(e) {
		var self = this;

		$.each(self.eventListeners, function() {
			
		});
	},

  move: function(Cat, tried) {
    // Determine distance
    distX = mouse.x - Cat.x;
    distY = mouse.y - Cat.y;

    // Horizontal distance greater - move horizontally
    if ((Math.abs(distX) > Math.abs(distY)) && distX != 0) {
      if (distX > 0){
        if (!game.move(Cat, 'east')) {
          if (distY > 0){
            game.move(Cat, 'north');
          } else {
            game.move(Cat, 'south');
          }
        }
      } else {
        if (!game.move(Cat, 'west')) {
          if (distY > 0){
            game.move(Cat, 'north');
          } else {
            game.move(Cat, 'south');
          }
        }
      }
      return;
    }

    if (Math.abs(distX) < Math.abs(distY) && distY != 0) { // Vertical distance greater - move vertically
      if (distY > 0){
        if (!game.move(Cat, 'north')) {
          if (distX > 0){
            game.move(Cat, 'east');
          } else {
            game.move(Cat, 'west');
          }
        }
      } else {
        if (!game.move(Cat, 'south')) {
          if (distX > 0){
            game.move(Cat, 'east');
          } else {
            game.move(Cat, 'west');
          }
        }
      }
      return;
    }
    /* Distances even - move diagonally
    * At this point, we're assuming they're 
    * not on top of each other - collide handles that
    */
    if (distX != 0 && distY != 0) { 
      if (distX > 0){
        if (distY > 0){
          game.move(Cat, 'northeast');
        } else {
          game.move(Cat, 'southeast');
        }
      } else {
        if (distY > 0){
          game.move(Cat, 'northwest');
        } else {
          game.move(Cat, 'southwest');
        }
      }

    }
    return;
  }
}
