var cheese = {};

cheese.init = function(x,y) {
	cheese.symbol = '&#9744;';
	cheese.type = 'cheese';
	cheese.movable = true;
	cheese.x = x;
	cheese.y = y;

	board.place( cheese );
};

