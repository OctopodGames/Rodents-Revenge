function cat (x,y) {
	this.symbol = '&#9773;';
	this.type = 'cat';
	this.x = x;
	this.y = y;
	this.timer=null;

	board.place( this );
};

// @TODO: chris - please make the cat smarter.


cat.move = function(kitty) {

//Move up or down
	//Move Cat Up
	if (mouse.y > kitty.y){
		game.move( kitty, 'up' );
		}
		
	else if (mouse.y == kitty.y){
		//Do nothing
		}
		
	//Move Cat Down
		else{
			game.move( kitty, 'down' );
			}
	
//Move left or right
	//Move Cat Right
	if (mouse.x > kitty.x){
		game.move(cat, 'right');
		}
		
		else if (mouse.x == kitty.x){
		//Do nothing
		}
	
	//Move Cat Left	
		else{
			game.move(kitty, 'left');
			}


}
