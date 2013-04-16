"use strict";

var Trap = function Trap(x, y, game) {
	this.game = game;
  this.symbol = 'trap.gif';
  this.movable = false;
  this.x = x;
  this.y = y;
  this.fatal = true;
};