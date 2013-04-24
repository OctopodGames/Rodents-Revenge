"use strict";

var SinkHole = function SinkHole(x, y, game) {
  this.symbol = "sinkhole.png";
	this.type = "sinkhole";
  this.movable = false;
  this.fatal = false;
  this.x = x;
  this.y = y;
};
