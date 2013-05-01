"use strict";

var Yarn = function Yarn(x, y, game) {
  this.symbol = "yarn.png";
	this.yarn = "yarn";
  this.movable = true;
  this.fatal = true;
  this.x = x;
  this.y = y;
  this.timer = null;
};

Yarn.prototype = {
  constructor: Yarn,
  
  // @TODO: please make yarn smarter.
  move: function() {
    
		/*
 		* The general idea behind my yarn, is that it determines which way to move
 		* based upon the edge it spawns on. From there it moves in a direction as if
 		* it had "bounced" off of that wall. The move is fed into an array with a chance
 		* of bouncing in a diagonal direction away from the wall as well.
 		*
 		* If the yarn comes into contact with another block in it's travels it will
 		* bounce off of those the same way, reflecting off them with random chance
 		* of varying in it's path.
 		*
 		* This continues until something happens to the yarn that removes it from the game.
 		*/

		
		//If the yarn is "touching a block" (i.e. - spawn, bouncing off another block)
			//Determine which edge the ball is spawning on
		
				//Set "direction" to the reflected direction



		//While the yarn doesn't hit anything

			//Create an array with a 20% chance of varying direction and an 80% chance of going with moveDir
		
			//Make the move	
			
		//When it does hit something
			
			//Set touchBlock = true
		
		
  }
};
