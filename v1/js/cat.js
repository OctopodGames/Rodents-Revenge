function cat (x,y) {
	this.x = x;
	this.y = y;
	this.symbol = '&#9773;';
	this.type = 'cat';
	this.movable = true;
	this.timer=null;

	board.place( this );
};
