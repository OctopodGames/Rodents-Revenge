var cat = {};

cat.init = function(x, y) {
	cat.x = x;
	cat.y = y;
	cat.symbol = '&#9773;';
	cat.type = 'cat';
	cat.movable = true;
	cat.timer=null;

	board.place( cat );

	cat.go();
};


cat.go = function() {

	cat.timer = setInterval( cat.move, 500 );

};

// @TODO: chris - please make the cat smarter.  (Zach D... you could help too)
cat.move = function() {
	game.move( cat, 'right' );
}