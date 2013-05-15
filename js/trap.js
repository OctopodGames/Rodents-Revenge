"use strict";

var Trap = function Trap(x, y, game) {
  this.symbol = "trap.png";
  this.type = "trap";
  this.movable = false;
  this.fatal = true;
  this.x = x;
  this.y = y;
};
