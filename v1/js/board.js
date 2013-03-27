var board = {};

/* function to create board
/* renamed and added parameters to create
/* a function that we can reuse later */
board.init = function( rows, columns ){
	var myboard='';
	board.rows = rows;
	board.columns = columns;
	board.squares = new Array; //holds multi-dimensional array of squares

	for(i = rows-1; i >= 0; i--){
		myboard+="<div class='row' id='row"+i+"'>";
		for( j = 0; j <= columns-1; j++ ){
			myboard+="<div class='cell' id='c"+j+"r"+i+"'></div>";
		}
		myboard+="</div>";
	}
	for( i = 0; i <= columns-1; i++ ){
		board.squares[i] = new Array;
		for( j = rows-1; j >= 0; j-- ){
			board.squares[ i ][ j ] = null;
		}
		myboard+="</div>";
	}
	
	$('#board').html( myboard );
}

board.place = function( object ) {
	$( '#c' + object.x + 'r' + object.y ).html( object.symbol );
	board.squares[object.x][object.y] = object.type;
}

board.remove = function( x, y ) {
	$( '#c' + x + 'r' + y ).html( '' );
	board.squares[x][y] = null;
}


/* @TODO: need a way to know where all the things are
/* I addes an array to hold square contents and added 
/* placement/removal to the .place and .remove functions - SJP */ 