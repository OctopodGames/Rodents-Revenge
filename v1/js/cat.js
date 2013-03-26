var cat = {};

cat.init = function() {
	cat.symbol = '&#9773;';
	cat.type = 'cat';
	cat.x = 1;
	cat.y = 1;

	board.place( cat );

	cat.go();
};


cat.go = function() {

	setInterval( cat.move, 500 );

};

// @TODO: chris - please make the cat smarter.  (Zach D... you could help too)
cat.move = function() {
	game.move( cat, 'right' );
}