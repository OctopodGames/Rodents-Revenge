"use strict";

var Yarn = function Yarn(x, y, game) {
  this.symbol = "yarn.png";
	this.yarn = "yarn";
  this.movable = true;
  this.fatal = true;
  this.x = x;
  this.y = y;
  this.timer = null;
};

Yarn.prototype = {
  constructor: Yarn,
  
  // @TODO: please make yarn smarter.
  move: function() {
    //game.move(yarn, "right");
  }
};
