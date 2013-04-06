function Yarn(x, y) {
	this.x = x;
	this.y = y;
	this.symbol = '&#9991;';
	this.movable = true;
	this.timer = null;
	this.fatal = true;
};

// @TODO: please make the yarn smarter.
Yarn.prototype.move = function() {
	//game.move( yarn, 'right' );
}
