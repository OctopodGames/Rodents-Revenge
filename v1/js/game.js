var game = {};
var game.level = {};

game.handleKey = function( e ) {
	switch ( e.keyCode ) {
		case key.left:
		case key.a:
			game.move( mouse, 'left' );
			break;

		case key.up:
		case key.w:
			game.move( mouse, 'up' );
			break;

		case key.right:
		case key.d:
			game.move( mouse, 'right' );
			break;

		case key.down:
		case key.s:
			game.move( mouse, 'down' );
			break;
	}

}

game.move = function( who, direction ) {
	if(mouse.lives >0){
		var keep_x = who.x;
		var keep_y = who.y;

		switch ( direction ) {
			case 'left':
			//go left
			if ( 0 == who.x ) {
				// dont move...hit an edge
				return false;
			} else if( board.squares[who.x-1][who.y] !== null ) {
				// dont move...collision
				this.collide(who.x-1,who.y);
				return false;
			}

			who.x--;
			break;

			case 'up':
			//go up
			if (  (board.rows - 1) == who.y ) {
				// dont move...hit an edge
				return false;
			} else if( board.squares[who.x][who.y+1] !== null ) {
				// dont move...collision
				this.collide(who.x,who.y+1);
				return false;
			}

			who.y++;
			break;

			case 'right':
			//go left
			if ( (board.columns - 1) == who.x ) {
				// dont move...hit an edge
				return false;
			} else if( board.squares[who.x+1][who.y] !== null ) {
				// dont move...collision
				this.collide(who.x+1,who.y);
				return false;
			}

			who.x++;
			break;

			case 'down':
			//go left
			if ( 0 == who.y ) {
				// dont move...hit an edge
				return false;
			} else if( board.squares[who.x][who.y-1] !== null ) {
				// dont move...collision
				this.collide(who.x,who.y-1);
				return false;
			}

			who.y--;
			break;
		}

		board.remove( keep_x, keep_y );
		board.place( who );
	}	
};

game.start = function() {
	game.cats = new Array;
	game.yarns = new Array;
	board.init( 10, 10 );
	mouse.init();
	cat.init();
	$(document).keydown( game.handleKey );
};

game.collide = function( x, y ) {
	alert( board.squares[x][y] );
	mouse.lives--;
	if( mouse.lives <= 0 ) {
		this.end();		
	}else{
		board.remove( mouse.x, mouse.y );
		//move mouse to center of board for now - pending test for "safe zone"
		mouse.x = 5;
		mouse.y = 5;
		board.place( mouse );
	}
}

game.end = function() {
	//stops cats moving after game ends - we'll need one for yarn too!
	clearInterval( cat.timer ); 
	alert( "Loser!");
}
game.readLevel = function( number ) {
	this.level = $.request('level'+number+'.json');
	//delegate the parameters to the proper objects
	//grid size
	//mouse placement
	//cats number = len(cats)
	//cat position
	//blocks number = len(blocks)
	//block position
	//rocks number = len(rocks)
	//rock position
	//traps number = len(traps)
	//trap position
	//holes number = len(holes)
	//hole position 
}

/* Global variables we might need */
var key = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	w: 87,
	a: 65,
	s: 83,
	d: 68
}

$(function() {
	game.start();
});
