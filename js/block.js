"use strict";

var Block = function Block(x, y, game) {
  this.symbol = "block.png";
  this.type = "block"
  this.movable = true;
  this.fatal = false;
  this.x = x;
  this.y = y;
};
