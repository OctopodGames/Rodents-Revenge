var trap = {};

trap.init = function(x,y) {
	trap.symbol = '&#9832;';
	trap.type = 'trap';
	trap.movable = false;
	trap.x = x;
	trap.y = y;

	board.place( trap );
};
