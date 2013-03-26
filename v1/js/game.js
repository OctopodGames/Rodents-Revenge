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

	var keep_x = who.x;
	var keep_y = who.y;

	switch ( direction ) {
		case 'left':
			//go left
			if ( 0 == who.x ) {
				// dont move...
				return false;
			}

			who.x--;
		break;

		case 'up':
			//go up
			if ( (board.rows - 1) == who.y ) {
				// dont move...
				return false;
			}

			who.y++;
		break;

		case 'right':
			//go left
			if ( (board.columns - 1) == who.x ) {
				// dont move...
				return false;
			}

			who.x++;
		break;

		case 'down':
			//go left
			if ( 0 == who.y ) {
				// dont move...
				return false;
			}

			who.y--;
		break;
	}

	board.remove( keep_x, keep_y );
	board.place( who );
};

game.start = function() {
	board.drawGrid( 10, 10 );
	mouse.init();
	cat.init();
	$(document).keydown( game.handleKey );
};


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
