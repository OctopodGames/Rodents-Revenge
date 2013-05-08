"use strict";

var normalGraphic = "mouse.png";
var stuckGraphic = "stuckMouse.png";

var Mouse = function Mouse(x, y, game) {
  this.symbol = normalGraphic;
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
  this.game = game;

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
    var self = this;
    var myBoard = self.game.board;
    myBoard.remove( self.x , self.y );   // remove the sinkhole graphic
    self.x = x;
    self.y = y;
    self.symbol = stuckGraphic;
    self.movable = false;
    myBoard.place( self );				// place the stuck mouse graphic

    setTimeout(function() {
      self.movable = true;
      self.symbol = normalGraphic;

      myBoard.remove( x , y );
      myBoard.place( self );
    }, 5000);

  }
};
