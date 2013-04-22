"use strict";

var SinkHole = function SinkHole(x, y, game) {
  this.game = game;
  this.symbol = 'sinkhole.png';
  this.movable = false;
  this.x = x;
  this.y = y;
  this.fatal = false;
};
