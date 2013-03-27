var block = {};

block.init = function(x,y) {
	block.symbol = '&#9744;';
	block.type = 'block';
	block.movable = true;
	block.x = x;
	block.y = y;

	board.place( block );
};

