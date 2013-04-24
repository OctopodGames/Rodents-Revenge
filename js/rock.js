"use strict";

var Rock = function Rock(x, y, game) {
  this.symbol = "rock.png";
	this.type = "rock";
  this.movable = false;
  this.fatal = false;
  this.x = x;
  this.y = y;
};
