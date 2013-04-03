var cat = {};

cat.init = function() {
	cat.symbol = '&#9773;';
	cat.type = 'cat';
	cat.x = 0;
	cat.y = 0;
	cat.timer=null;

	board.place( cat );

	cat.go();
};


cat.go = function() {

	cat.timer = setInterval( cat.move, 500 );

};

// @TODO: chris - please make the cat smarter.


cat.move = function() {

//Move up or down
	//Move Cat Up
	if (mouse.y > cat.y){
		game.move( cat, 'up' );
		}
		
	else if (mouse.y == cat.y){
		//Do nothing
		}
		
	//Move Cat Down
		else{
			game.move( cat, 'down' );
			}
	
//Move left or right
	//Move Cat Right
	if (mouse.x > cat.x){
		game.move(cat, 'right');
		}
		
		else if (mouse.x == cat.x){
		//Do nothing
		}
	
	//Move Cat Left	
		else{
			game.move(cat, 'left');
			}


}
