"use strict";

var Cheese = function Cheese(x, y, game) {
  this.game = game;
 	this.symbol = '&#9744;';
  this.movable = true;
  this.x = x;
  this.y = y;
  this.fatal = true;
}
