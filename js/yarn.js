"use strict";

var Yarn = function Yarn(x, y, game) {
	this.game = game;
  this.x = x;
  this.y = y;
  this.symbol = '&#9991;';
  this.movable = true;
  this.timer = null;
  this.fatal = true;
}

Yarn.prototype = {
  constructor: Yarn,
  
  // @TODO: please make yarn smarter.
  move: function() {
    //game.move(yarn, 'right');
  }
}
