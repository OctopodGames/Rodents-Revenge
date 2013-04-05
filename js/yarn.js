function yarn (x, y) {
	this.x = x;
	this.y = y;
	this.symbol = '&#9991;';
	this.type = 'this';
	this.movable = true;
	this.timer=null;
	this.fatal = true;

	board.place( this );
};


// @TODO: please make the yarn smarter.
yarn.move = function() {
	game.move( yarn, 'right' );
}