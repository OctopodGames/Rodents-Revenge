function sinkhole (x,y) {
	this.symbol = '&#9732';
	this.type = 'this';
	this.movable = false;
	this.x = x;
	this.y = y;

	board.place( this );
};
