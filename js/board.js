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
			newBoard += "<div class='rw' id='row"+i+"'>";
			for (var j = 0; j <= self.columns-1; j++) {
				var id = "c"+j+"r"+i;
				newBoard+="<div class='cell' id='"+id+"'><img id='img-"+id+"' src='img/blank.png' /></div>";
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

		$("#board").html(newBoard);
	},

	testSquare: function(x,y){
		var self = this;
		if(x >= 0 && x < self.columns && y >= 0 && y < self.rows){return true;}
		return false;
	},

	place: function(entity) {
		var self = this;
		var x = entity.x;
		var y = entity.y;
		var id = "c" + x + "r" + y;
		if(self.testSquare(x, y)){		
		$("#"+id)
			.html("<img id='img-"+id+"' src='img/" + entity.symbol + "' />");
		self.squares[x][y] = entity;
		}else{
			return false;
		}
	},

	remove: function(x, y) {
		var self = this;
		$("#c" + x + "r" + y)
			.find("img").remove();
		self.squares[x][y] = null;
		$("#c" + x + "r" + y)
			.prepend("<img id=\"img-c" + x + "r" + y  + "\" src=\"img/blank.png\" />");
		self.squares[x][y] = null;
	},

	getSquare: function(x, y, direction) {
		var self = this;
		var square = [];
		var newX = x;
		var newY = y;

		// -1, -1 means cannot move in that direction - met a board edge
		switch (direction) {
		case "west":
			if (0 == x) {
				newX = -1;
				newY = -1;
			} else {
				newX = x - 1;
			}
			break;

		case "north":
			if ((self.rows - 1) == y) {
				newX = -1;
				newY = -1;
			} else {
				newY = y + 1;
			}
			break;

		case "east":
			if ((self.columns - 1) == x) {
				newX = -1;
				newY = -1;
			} else {
				newX = x + 1;
			}
			break;

		case "south":
			if (0 == y) {
				newX = -1;
				newY = -1
			} else {
				newY = y - 1;
			}
			break;

		case "northwest":
			if ((self.rows - 1) == y || x == 0) {
				newX = -1;
				newY = -1;
			} else {
				newX = x - 1;
				newY = y + 1;
			}
			break;

		case "northeast":
			if ((self.rows - 1) == y || (self.columns - 1) == x) {
				newX = -1;
				newY = -1;
			} else {
				newX = x + 1;
				newY = y + 1;
			}
			break;

		case "southwest":
			if (0 == y || 0 == x) {
				newX = -1;
				newY = -1;
			} else {
				newX = x - 1;
				newY = y - 1;
			}
			break;

		case "southeast":
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
	},

	findRandomEmptySquare: function() {
		var self = this;

		var x = Math.floor(Math.random() * self.columns);
		var y = Math.floor(Math.random() * self.rows);

		if (self.squares[x][y] === null) {
			return [x, y];
		} else {
			self.findRandomEmptySquare();
		}
	}
};