"use strict";

var Rock = function Rock(x, y, game) {
  this.game = game;
  this.symbol = 'rock.gif';
  this.movable = false;
  this.x = x;
  this.y = y;
  this.fatal = false;
};