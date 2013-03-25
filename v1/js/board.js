var board = {};

/* function to create board
/* renamed and added parameters to create
/* a function that we can reuse later */
board.drawGrid = function( rows, columns ){
	var myboard='';

	board.rows = rows;
	board.columns = columns;

	for(i = rows-1; i >= 0; i--){
		myboard+="<div class='row' id='row"+i+"'>";
		for(j = 0; j <= columns-1; j++){
			myboard+="<div class='cell' id='c"+j+"r"+i+"'></div>";
		}
		myboard+="</div>";
	}
	$('#board').html( myboard );
}

board.place = function( object ) {
	$( '#c' + object.x + 'r' + object.y ).html( object.symbol );
}

board.remove = function( x, y ) {
	$( '#c' + x + 'r' + y ).html( '' );
}


// @TODO: need a way to know where all the things are