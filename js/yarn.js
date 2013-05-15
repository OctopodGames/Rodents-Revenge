"use strict";

var Yarn = function Yarn(x, y, game) {
  this.symbol = "yarn.png";
  this.type = "yarn";
  this.movable = true;
  this.fatal = true;
  this.x = x;
  this.y = y;
  this.timer = null;

	this.timer();
};

//This is my attempt at reading and emulating some of the Object-Oriented Stuff Stephen Wrote
//Z.D. helped me better understand what is happening and how it's working, but it's still over my head by a bit

Yarn.prototype = {
  constructor: Yarn,
  alive = true;
	
	addEventListener: function(object) {
		this.eventListener.push(object);
	},
	
	removeEventListener: function(obj) {
		var position = $.inArray(obj, this.eventListeners);
	},

	emitEvent: function(eventName) {
		var self = this;

	},
}
  move: function() {
	
		//Declare some variables
		var alive;
		alive = true;

		
    while (alive == true){
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
		
		//If the yarn hasn't moved yet
		if (this.hasMoved = 0;){
			//Determine which wall the yarn is sitting on and "Bounce" off of that wall and keep moving in that dir (dir=direction)
			if (this.x==0 && this.y==0){
				this.dir = northeast;			
			}
    	else if (this.x==0 && this.y==25){
				this.dir = southeast;
      }
      else if (this.x==25 && this.y==25){
				this.dir = southwest;
      }
      else if (this.x==25 && this.y==0){
				this.dir = northwest;
      }
      else if (this.x==0){
				this.dir = east;
      }
      else if (this.x==0 && this.y==0){
				this.dir = west;
      }
      else if (this.x==0 && this.y==0){
				this.dir = north;
      }
      else if (this.x==0 && this.y==0){
				this.dir = south;
      }
			this.hasMoved = 1;
		}
		//Else, if the ball is already moving
		else{
			//Check and see if the ball is going to "hit" something.
			if (this.dir == north){
				if ((this.x)+1 != null){
					hit = 1;
					side = n;	
				}	
			}
      if (this.dir == south){
				if ((this.x)-1 != null){
					hit = 1;
					side = s;
      	}
			}
      if (this.dir == east){
				if ((this.y)+1 != null){
					hit = 1;
					side = e;
				}
      }
      if (this.dir == west){
				if((this.y)-1 != null){
					hit = 1;
					side = w;
				}
      }
      if (this.dir == northwest){
        if((this.x-1) && (this.y+1) != null){
          hit = 1;
					side = nw;
        }
      }
      if (this.dir == northeast){
        if((this.x+1) && (this.y+1) != null){
          hit = 1;
					side = ne;
        }
      }
      if (this.dir == southwest){
        if((this.x-1) && (this.y-1) != null){
          hit = 1;
					side = sw;
        }
      }
      if (this.dir == southeast){
        if((this.x-1) && (this.y+1) != null){
          hit = 1;
					side = se;
        }
      }
			
     	//If it is...
			if (hit == 1){
					//Create an array of possible "bounces"

					//Create a random number between 1 and the #ofMoves
					//Choose that move from the array and make that the new direction
			}
			else{	
				//If it isn't
					//Keep moving in the same direction.
			}
		}
		}
	}	
};
