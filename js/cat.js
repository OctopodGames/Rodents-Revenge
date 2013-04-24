"use strict";

var Cat = function Cat(x, y, game, mouse) {
  this.symbol = "cat.png";
  this.type = "cat";
  this.movable = true;
  this.fatal = true;
  this.x = x;
  this.y = y;
  this.moveX = x;
  this.moveY = y;
  this.mouseX = mouse.x;
  this.mouseY = mouse.y;
  this.eventListeners = [];

  this.addEventListener(game);
  this.timer();
}

Cat.prototype = {
  constructor: Cat,

  addEventListener: function(object) {
    this.eventListeners.push(object);
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
        "emitter": self,
      });
    });
  },

  timer: function() {
    var self = this;
    var dir = "north";

    window.setInterval(function() {
      self.move(dir);
      
      if (dir == "north") {
        dir = "south";
      } else {
        dir = "north";
      }

      self.emitEvent("move");
    }, 1000);
  },

  move: function(direction) {
    var self = this;
    /*var xDiff = self.mouseX - self.x;
    var yDiff = self.mouseY - self.y;*/

    switch (direction) {
    case "north":
      this.moveY = this.moveY + 1;
      break;

    case "south":
      this.moveY = this.moveY - 1;
      break;
    }
  },

  updateMouseLocation: function(mouse) {
    this.mouseX = mouse.x;
    this.mouseY = mouse.y;
  }
}
