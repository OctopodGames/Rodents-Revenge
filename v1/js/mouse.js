var mouse = {};

mouse.init = function() {
	mouse.symbol = '&#9765;';
	mouse.type = 'player';
	mouse.movable = true;
	mouse.x = 5;
	mouse.y = 5;
	mouse.lives = 3;

	board.place( mouse );
};

