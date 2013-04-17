"use strict";

var Yarn = function Yarn(x, y, game) {
	this.game = game;
  this.symbol = 'yarn.png';
  this.x = x;
  this.y = y;
  this.movable = true;
  this.timer = null;
  this.fatal = true;
};

Yarn.prototype = {
  constructor: Yarn,
  
  // @TODO: please make yarn smarter.
  move: function() {
    //game.move(yarn, 'right');
  }
};
