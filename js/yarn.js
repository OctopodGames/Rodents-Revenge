"use strict";

var Yarn = function Yarn(x, y, game) {
  this.symbol = "yarn.png";
  this.type = "yarn";
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
    while (alive = true){
		/*
 		* The general idea behind my yarn, is that it determines which way to move
 		* based upon the edge it spawns on. From there it moves in a direction as if
 		* it had "bounced" off of that wall. The move is fed into an array with a chance
 		* of bouncing in a diagonal direction away from the wall as well.
 		*
 		* If the yarn comes into contact with another block in it's travels it will
 		* bounce off of those the same way, reflecting off them with random chance
 		* of varying in it's path.
 		* This continues until something happens to the yarn that removes it from the game.
 		*/

		//Declare the variables an arrays
		moveArray = new Array();
		var random;
		var direction;
		var touchBlock;
		var altMove;

	
		//If the yarn is "touching a block" (i.e. - spawn, bouncing off another block) <-- Currently just edge
		if (touching == true){
			//Determine which edge the ball is spawning on and set the proper direction			
			if (this.x == 0 && this.y == 0){
				direction = northeast;
			}
			else if (this.x == 0 && this.y == 10){
				direction = southeast;
			}
			else if (this.x == 10 && this.y == 10){
				direction = southwest;
			}
			else if (this.x == 10 && this.y == 0){
				direction = northwest;
			}
			else if (this.x == 0){	
				direction = west;
			}
			else if (this.x == 10){
				direction = east;
			}
			else if (this.y == 0){
				direction = north;
			}
			else if (this.y == 10){
				direction = south;
			}
		}


		//While the yarn doesn't hit anything
		while (touchBlock != true){
			//Determine the "alternate move" possible in the array
			

			//Create an array with a 20% chance of varying direction and an 80% chance of going with moveDir
			moveArray[0]=moveDir;
			moveArray[1]=moveDir;
			moveArray[2]=moveDir;
			moveArray[3]=moveDir;
			moveArray[4]=moveDir;
			
			//Make the move by generating a random digit corrosponding to the array, and make that move	
			random = Math.random()*(4-0)+0;
			move = moveArray[random];			
			
		//When it does hit something
			
			//Set touchBlock = true
			touchBlock = true;	
		}
	}
  }
};
