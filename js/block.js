"use strict";

var Block = function Block(x, y, game) {
	this.game = game;
  this.symbol = 'block.png';
  this.movable = true;
  this.x = x;
  this.y = y;
  this.fatal = false;
};
