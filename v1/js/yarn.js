var yarn = {};

yarn.init = function(x, y) {
	yarn.x = x;
	yarn.y = y;
	yarn.symbol = '&#9991;';
	yarn.type = 'yarn';
	yarn.movable = true;
	yarn.timer=null;

	board.place( yarn );

	yarn.go();
};


yarn.go = function() {
	yarn.timer = setInterval( yarn.move, 500 );
};

// @TODO: please make the yarn smarter.
yarn.move = function() {
	game.move( yarn, 'right' );
}