function cheese (x,y) {
	this.symbol = '&#9744;';
	this.type = 'this';
	this.movable = true;
	this.x = x;
	this.y = y;

	board.place( this );
};

