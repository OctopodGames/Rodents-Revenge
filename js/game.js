"use strict";



var key = {

	left: 37,

	up: 38,

	right: 39,

	down: 40,

	w: 87,

	a: 65,

	s: 83,

	d: 68,

	n: 78, // load a new level of the user's choosing

	r: 82  // reload this level

};



var Game = function Game(levelNumber) {

	var self = this;



	this.gameOn = true;

	this.currentLevel = levelNumber;

	this.boundEvents = [];

	this.eventQueue = [];

	this.eventHandlers = {};

	this.time = 0;

	this.score = 0;



	this.mouse = {};

	this.board = {};

	this.cats = [];

	this.yarn = [];

	this.blocks = [];

	this.rocks = [];

	this.traps = [];

	this.sinkholes = [];



	// Event handlers

	this.onEvent("deadMau5", function(emitter) {

		self.board.remove(emitter.x, emitter.y);

		var newSquare = self.board.findRandomEmptySquare();

		emitter.x = newSquare[0];

		emitter.y = newSquare[1];

		window.setTimeout(function() {

			self.board.place(emitter);

		}, 3000);

	});

	//this.onEvent("move", function() {});

	this.onEvent("gameOver", function() {

		self.end();

	});



	// Add game object to document, for keypress handling

	document.game = this;



	// Begin handling events

	this.handleEvents();

};



Game.prototype = {

	constructor: Game,



	addEvent: function(eventData) {

		this.eventQueue.push(eventData);

	},



	onEvent: function(eventName, callback) {

		this.eventHandlers[eventName] = callback;

	},



	handleEvents: function() {

		var self = this;



		window.setInterval(function() {

			var currentEvent;



			while (self.eventQueue.length > 0) {

				currentEvent = self.eventQueue.shift();

				if (self.eventHandlers.hasOwnProperty(currentEvent.eventName)) {

					self.eventHandlers[currentEvent.eventName](currentEvent.emitter);

				}

			}

		}, 16.666);

	},



	start: function(levelNumber) {

		var self = this;



		self.loadLevel(levelNumber);

		self.placeObjects();

		//self.clock = setInterval("self.timer()", 1500);

		$(document).keydown(self.handleKey);

	},



	loadLevel: function(levelNumber) {

		var self = this;

		/** Read in level objects from file **/

		$.ajax({

			url: "levels/level"+levelNumber+".json",

			dataType: "json",

			async: false,

			success: function(level) {

				// Create the board

				self.board = new Board(level.board.x, level.board.y, self);

				// Create the mouse

				self.mouse = new Mouse(level.mouse.x, level.mouse.y, self)

				// Create the cats

				$.each(level.cats, function() {

					self.cats.push(new Cat(this[0], this[1], self, self.mouse));

				});

				// Create the blocks

				$.each(level.blocks, function() {

					self.blocks.push(new Block(this[0], this[1], self));

				});

				// Create the rocks

				$.each(level.rocks, function() {

					self.rocks.push(new Rock(this[0], this[1], self));

				});

				// Create the traps

				$.each(level.traps, function() {

					self.traps.push(new Trap(this[0], this[1], self));

				});

				// Create the yarn

				$.each(level.yarn, function() {

					self.yarn.push(new Yarn(this[0], this[1], self));

				});

				// Create the sinkholes

				$.each(level.sinkholes, function() {

					self.sinkholes.push(new SinkHole(this[0], this[1], self));

				});

			}

		});

	},



	placeObjects: function() {

		var self = this;



		// Draw board

		self.board.draw();

		// Place objects on board

		self.board.place(this.mouse); // Place mouse

		$.each(self.cats, function() { // Place cats

			self.board.place(this);

		});

		$.each(self.blocks, function() { // Place blocks

			self.board.place(this);

		});

		$.each(self.rocks, function() { // Place rocks

		//console.log(JSON.stringify(this, null, 4));

			self.board.place(this);

		});

		$.each(self.traps, function() { // Place traps

			self.board.place(this);

		});

		$.each(self.yarn, function() { // Place yarn

			self.board.place(this);

		});

		$.each(self.sinkholes, function() { // Place sinkholes

			self.board.place(this);

		});

		self.time = 0;

		window.setTimeout(function(){self.timer();}, 1000);

	},



	timer: function(){

		var self = document.game;

		self.time++;

		if((self.time % 10) == 0){

			//alert(self.score);

		self.score++;

			$('#score').html(self.score);

		}

		

		$('#ttc').html(30 - (self.time % 30));

		$('#tty').html(60 - (self.time % 60));

		

		window.setTimeout(function(){self.timer();}, 1000);

	},

	

	handleKey: function(e) {

		var self = document.game;



		if (self.mouse.movable == false) {

			return;

		}



		switch (e.keyCode) {

			case key.left:

			case key.a:

				self.move(self.mouse, "west");

				break;



			case key.up:

			case key.w:

				self.move(self.mouse, "north");

				break;



			case key.right:

			case key.d:

				self.move(self.mouse, "east");

				break;



			case key.down:

			case key.s:

				self.move(self.mouse, "south");

				break;

			

			case key.n:

				self.loadNewLevel();

				break;

				

			case key.r:

				self.resetLevel(self.currentLevel);

				break;

		}

	},



	resetLevel: function(levelNumber) {

		var self = this;

		self.board.draw();



		self.mouse = {};

		self.board = {};

		self.cats = [];

		self.yarn = [];

		self.blocks = [];

		self.rocks = [];

		self.traps = [];

		self.sinkholes = [];



		self.loadLevel(levelNumber);

		self.placeObjects();

	},

	

	loadNewLevel: function() {

		

		var newLevelNum = prompt("Level to load:");

		this.resetLevel(newLevelNum);

		

		

	},

	

	end: function() {

		alert("Game Over!");



		// This a HORRIBLE, DIRTY trick to stop keypresses.

		// Someone who knows what they're doing should probably fix this.

		key = {};  // nuke the key character values. BOOM.

	},



	move: function(who, direction) {

		var self = this;



		if (self.gameOn) {

			var keepX = who.x;

			var keepY = who.y;

			if (who.type === "mouse") {

				// I"m going to use this for game.shoveBlockChain

				// since I don't want to pass direction through two functions

				who.direction = direction;

			}

			var newSquare = self.board.getSquare(who.x, who.y, direction);

			if (newSquare[0] == -1 && newSquare[1] == -1) {

				return false; // don't move...hit an edge

			} else if (self.board.squares[newSquare[0]][newSquare[1]] !== null) {

				// collision...decide result

				if (self.collide(who, newSquare[0], newSquare[1])) {

					// Immobile obstruction. Don't move

					return false;

				}

			}

			// OK to move

			who.x = newSquare[0];

			who.y = newSquare[1];

			self.board.remove(keepX, keepY);

			self.board.place(who);

			return true;

		}

	},



	collide: function(movedObj, x, y) {

		var self = this;

		// @TODO: test if there is a bug when cat/yarn & mouse move to same square simultaneously

		if (movedObj.type === "mouse") {

			switch (self.board.squares[x][y].type) {

				case "cat":

				case "yarn":

					self.mouse.die();

					return true; // Don't execute move, next mouse re-appeared in safe zone.

					break;

				case "sinkhole":

					self.mouse.stuck(x, y); // Mouse is stuck for ten cat turns

					return false;

					break;

				case "trap":

					self.mouse.die();

					self.board.remove(x, y); // Remove trap from board

					return true;

				case "block":

				if (this.shoveBlockChain(x, y)) {

					return false;

				} else {

					return true;

				}

				break;

				case "rock":

					return true;

					break;

			}

		}



		// if a cat or yarnball hits the mouse, it dies. Those are the only other active objects

		if (self.board.squares[x][y].type === "mouse") {

			self.mouse.die();

			return false; // No collision - mouse died, OK to move

		} else {

			// Cat or yarn bounced into something else

			return true;

		}

	},



	shoveBlockChain: function(x, y) {

		//find the end of the chain of blocks & check for obstruction

		var results = this.findChainEnd(x, y);



		if (!results[0]) {

			// the chain of blocks is obstructed - can't move

			return false;

		} else if (results[1] === "sinkhole") {

			//um, just obliterate them with the mouse character

			return true;

		} else {

			// add block at chain end. Then let normal mouse move obliterate closest block

			x = results[2];

			y = results[3];

			if(this.board.testSquare(x,y)){

				this.board.place(new Block(x, y, this))

				return true;        

			}else{

				return false;

			}

			

		}



	},



	findChainEnd: function(x, y) {

		var self = this;    

		//find the end of the chain of blocks

		var chainEnd = [1,this.board.squares[x][y].type,x,y];

		var newSquare = new Array;

		while(self.board.squares[x][y].type == "block"){

			newSquare = this.board.getSquare(x, y, this.mouse.direction);



			chainEnd[2] = x = newSquare[0];

			chainEnd[3] = y = newSquare[1];

			if(newSquare[0] == -1 || newSquare[1] == -1){

				break;

			}else if(self.board.squares[x][y] === null){

				chainEnd[1]='space';

				break;

			}else{

				chainEnd[1] = self.board.squares[x][y].type;

			}

		}

		// x,y now points to whatever is at the end



		// not null, so something other than space

		// @TODO: Here is where we really need the object map

		//    We need to be able to tell if something is movable or not

		//    and we can"t until we can query a particular object

		// @TODO: Someone else should probably figure out how to move

		//    non-block objects at the end of a block chain

		switch (chainEnd[1]) {

			case null:

				break;

			//non-movable

			case "yarn":

			case "cat":

			case "trap":

			case "rock":

				chainEnd[0] = 0;

				break;

			// for now, cat and yarn ball icons are erased by blocks. Oops.

			case "sinkhole":

				chainEnd[1] = "sinkhole";

				break;

			default:

				chainEnd[1] = "space";

		}



		return chainEnd;

	},

};



/* START GAME */

$(function() {

	var levelNumber = 1;

	var game = new Game(levelNumber)

	game.start(levelNumber);

});
