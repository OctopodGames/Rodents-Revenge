"use strict";

var Rock = function Rock(x, y, game) {
	this.game = game;
  this.symbol = '&#9746;';
  this.movable = false;
  this.x = x;
  this.y = y;
  this.fatal = false;
}
