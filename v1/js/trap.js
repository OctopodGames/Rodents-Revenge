function trap (x,y) {
	this.symbol = '&#9832;';
	this.type = 'this';
	this.movable = false;
	this.x = x;
	this.y = y;
	this.fatal = true;

	board.place( this );
};
