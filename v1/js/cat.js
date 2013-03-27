var cat = {};

cat.init = function() {
	cat.symbol = '&#9773;';
	cat.type = 'cat';
	cat.x = 1;
	cat.y = 1;
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