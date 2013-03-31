var mouse = {};

mouse.init = function() {
	mouse.symbol = '&#9765;';
	mouse.type = 'player';
	mouse.movable = true;
	mouse.x = 5;
	mouse.y = 3;
	mouse.lives = 3;
	mouse.direction = '';

	board.place( mouse );
};

mouse.die = function() {
	this.lives--;
	alert( 'Mouse died. Number of lives left: ' + this.lives );
	if( this.lives <= 0 ) {
		game.end();		
	} else {
		board.remove( this.x, this.y );
		//move mouse to center of board for now - pending test for "safe zone"
		this.x = 5;
		this.y = 5;
		board.place( mouse );
	}
}