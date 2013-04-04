var rock = {};

rock.init = function(x,y) {
	rock.symbol = '&#9746;';
	rock.type = 'rock';
	rock.movable = false;
	rock.x = x;
	rock.y = y;

	board.place( rock );
};
