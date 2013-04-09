var Mouse = function Mouse(x, y) {
	this.symbol = '&#9765;';
	this.movable = true;
	this.x = 5;
	this.y = 3;
	this.lives = 3;
	this.direction = '';
	this.fatal = true;
}

Mouse.prototype = {
	constructor: Mouse,
	
	die: function() {
		this.lives--;
		alert('Mouse died. Number of lives left: ' + this.lives);
		if (this.lives <= 0) {
			game.end();		
		} else {
			board.remove(this.x, this.y);
			//move mouse to center of board for now - pending test for "safe zone"
			this.x = 5;
			this.y = 5;
			mouse.movable = true;       //reset in case mouse was stuck in a sinkhole
			this.symbol = '&#9765;';   //reset in case mouse was stuck in a sinkhole
			board.place(mouse);
		}
	},

	stuck: function(x, y) {
		board.remove(this.x, this.y);
		this.x = x;
		this.y = y;
		this.symbol = '&#9785;';
		this.movable = false;
		board.place( mouse );
		alert( 'Mouse is stuck for ten turns!');
		setTimeout(function() { 
			mouse.movable = true; 
			mouse.symbol = '&#9765;';
			//alert('Mouse is free');
			board.place( mouse );
		}, 5000);
	}
};
