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
    $('#c' + entity.x + 'r' + entity.y).html(entity.symbol);
    this.squares[entity.x][entity.y] = entity;
  },

  remove: function(x, y) {
    $('#c' + x + 'r' + y).html('');
    board.squares[x][y] = null;
  },

  getSquare: function(x, y, direction) {
    var self = this;
    var square = [];
    newX = x;
    newY = y;

    // -1, -1 means cannot move in that direction - met a board edge
    switch (direction) {
      case 'left':
      if (0 == x) {
        newX = -1;
        newY = -1;
      } else {
        newX = x - 1;
      }
      break;

      case 'up':
      if ((self.rows - 1) == y) {
        newX = -1;
        newY = -1;
      } else {
        newY = y + 1;
      }
      break;

      case 'right':
      if ((self.columns - 1) == x) {
        newX = -1;
      } else {
        newX = x + 1;
      }
      break;

      case 'down':
      if (0 == y) {
        newX = -1;
      } else {
        newY = y - 1;
      }
      break;

      case 'upleft':
      if ((self.rows - 1) == y || x == 0) {
        newX = -1;
      } else {
        newX = x - 1;
        newY = y + 1;
      }
      break;

      case 'upright':
      if ((self.rows - 1) == y) {
        newX = -1;
      } else {
        newX = x + 1;
        newY = y + 1;
      }
      break;

      case 'downleft':
      if (0 == y) {
        newX = -1;
      } else {
        newX = x - 1;
        newY = y - 1;
      }
      break;

      case 'downright':
      if (0 == y) {
        newX = -1;
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
