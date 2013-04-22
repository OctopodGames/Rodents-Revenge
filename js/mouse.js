"use strict";

var Mouse = function Mouse(x, y, game) {
  this.symbol = "mouse.png";
  this.type = "mouse";
  this.movable = true;
  this.fatal = false;
  this.startingX = x;
  this.x = x;
  this.startingY = y;
  this.y = y;
  this.lives = 3;
  this.direction = "";
  this.eventListeners = [];

  this.addEventListener(game);
};

Mouse.prototype = {
  constructor: Mouse,

  addEventListener: function(obj) {
    this.eventListeners.push(obj);
  },

  removeEventListener: function(obj) {
    var position = $.inArray(obj, this.eventListeners);

    if (position >= 0) {
      this.eventListeners.splice(position, 1);
    }
  },

  emitEvent: function(eventName) {
    var self = this;

    $.each(this.eventListeners, function() {
      this.addEvent({
        "eventName": eventName,
        "emitter": self
      });
    });
  },

  die: function() {
    this.lives--;
    console.log("Mouse died. Number of lives left: " + this.lives);
    if (this.lives <= 0) {
      this.emitEvent("gameOver");
    } else {
      this.emitEvent("deadMau5");
    }
  },

  stuck: function(x, y) {
    board.remove(this.x, this.y);
    this.x = x;
    this.y = y;
    this.symbol = "&#9785;";
    this.movable = false;
    board.place( mouse );
    alert("Mouse is stuck for ten turns!");
    setTimeout(function() {
      mouse.movable = true;
      mouse.symbol = "&#9765;";
      //alert("Mouse is free");
      board.place( mouse );
    }, 5000);
  }
};
