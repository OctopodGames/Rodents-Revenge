"use strict";

var Board = function Board(rows, columns, game) {
	this.game = game;
  this.rows = rows;
  this.columns = columns;
  this.squares = [];
};

Board.prototype = {
  constructor: Board,
  
  draw: function() {
    var self = this;
    var newBoard = "";

		// Define DOM grid
    for (var i = self.rows-1; i >= 0; i--) {
      newBoard += "<div class='row' id='row"+i+"'>";
      for (var j = 0; j <= self.columns-1; j++) {
        newBoard+="<div class='cell' id='c"+j+"r"+i+"'></div>";
      }
      newBoard += "</div>";
    }

		// Define logical grid
    for (var i = 0; i <= self.columns-1; i++) {
      self.squares[i] = [];
	
      for (var j = self.rows-1; j >= 0; j--) {
        self.squares[i][j] = null;
      }

      newBoard+="</div>";
    }

    $('#board').html(newBoard);
  },

  place: function(entity) {
    $('#c' + entity.x + 'r' + entity.y)
			.css("background-image", "url('img/" + entity.symbol + "')")
			.css("background-position", "center")
			.css("background-repeat", "no-repeat");
    this.squares[entity.x][entity.y] = entity;
  },

  remove: function(x, y) {
    $('#c' + x + 'r' + y)
			.css("background-image", "")
			.css("background-position", "")
			.css("background-repeat", "");
    this.squares[x][y] = null;
  },

  getSquare: function(x, y, direction) {
    var self = this;
    var square = [];
    var newX = x;
    var newY = y;

    // -1, -1 means cannot move in that direction - met a board edge
    switch (direction) {
    case 'west':
      if (0 == x) {
        newX = -1;
        newY = -1;
      } else {
        newX = x - 1;
      }
      break;

    case 'north':
      if ((self.rows - 1) == y) {
        newX = -1;
        newY = -1;
      } else {
        newY = y + 1;
      }
      break;

    case 'east':
      if ((self.columns - 1) == x) {
        newX = -1;
				newY = -1;
      } else {
        newX = x + 1;
      }
      break;

    case 'south':
      if (0 == y) {
        newX = -1;
				newY = -1
      } else {
        newY = y - 1;
      }
      break;

    case 'northwest':
      if ((self.rows - 1) == y || x == 0) {
        newX = -1;
				newY = -1;
      } else {
        newX = x - 1;
        newY = y + 1;
      }
      break;

    case 'northeast':
      if ((self.rows - 1) == y || (self.columns - 1) == x) {
        newX = -1;
				newY = -1;
      } else {
        newX = x + 1;
        newY = y + 1;
      }
      break;

    case 'southwest':
      if (0 == y || 0 == x) {
        newX = -1;
				newY = -1;
      } else {
        newX = x - 1;
        newY = y - 1;
      }
      break;

    case 'southeast':
      if (0 == y || (self.columns - 1) == x) {
        newX = -1;
				newY = -1;
      } else {
        newX = x + 1;
        newY = y - 1;
      }
      break;
    }
    square = [newX, newY];
    return square;
  }
};

/* @TODO: need a way to know where all the things are
/* I addes an array to hold square contents and added 
/* placement/removal to the .place and .remove functions - SJP */
