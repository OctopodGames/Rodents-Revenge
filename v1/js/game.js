var game = {};

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
	game.blocks = new Array;
	game.rocks = new Array;
	game.traps = new Array;
	game.holes = new Array;
	board.init( 10, 10 );
	mouse.init();
	// @TODO: foreach file.cats...
	game.cats.push( cat.init(1,1) );
	// @TODO: same for yarn...
	game.yarns.push( yarn.init(7,7) );
	// @TODO: foreach file.cats...
	game.blocks.push( block.init(3,3) );
	// @TODO: foreach file.cats...
	game.rocks.push( rock.init(8,8) );
	// @TODO: foreach file.cats...
	game.traps.push( trap.init(6,6) );
	// @TODO: foreach file.cats...
	game.holes.push( sinkhole.init(4,4) );
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
	/* stops cats moving after game ends - we'll need one for yarn too!
	// @TODO: should be a foreach..but we're not there yet */
	cats.forEach( clearInterval( this.timer ) ); 
	alert( "Loser!");
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
