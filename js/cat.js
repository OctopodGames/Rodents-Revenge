"use strict";

var Cat = function Cat(x, y, game) {
  this.symbol = 'cat.gif';
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

  move: function(kitty, tried) {
    // Determine distance
    distX = mouse.x - kitty.x;
    distY = mouse.y - kitty.y;

    // Horizontal distance greater - move horizontally
    if ((Math.abs(distX) > Math.abs(distY)) && distX != 0) {
      if (distX > 0){
        if (!game.move(kitty, 'right')) {
          if (distY > 0){
            game.move(kitty, 'up');
          } else {
            game.move(kitty, 'down');
          }
        }
      } else {
        if (!game.move(kitty, 'left')) {
          if (distY > 0){
            game.move(kitty, 'up');
          } else {
            game.move(kitty, 'down');
          }
        }
      }
      return;
    }

    if (Math.abs(distX) < Math.abs(distY) && distY != 0) { // Vertical distance greater - move vertically
      if (distY > 0){
        if (!game.move(kitty, 'up')) {
          if (distX > 0){
            game.move(kitty, 'right');
          } else {
            game.move(kitty, 'left');
          }
        }
      } else {
        if (!game.move(kitty, 'down')) {
          if (distX > 0){
            game.move(kitty, 'right');
          } else {
            game.move(kitty, 'left');
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
          game.move(kitty, 'upright');
        } else {
          game.move(kitty, 'downright');
        }
      } else {
        if (distY > 0){
          game.move(kitty, 'upleft');
        } else {
          game.move(kitty, 'downleft');
        }
      }

    }
    return;
  }
}