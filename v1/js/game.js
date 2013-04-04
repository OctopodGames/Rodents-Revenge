var game = {};
game.cats = new Array;
game.yarns = new Array;
game.blocks = new Array;
game.rocks = new Array;
game.traps = new Array;
game.holes = new Array;


game.handleKey = function( e ) {
	if(mouse.movable == false){
		return;
	}
	switch ( e.keyCode ) {
		case key.left:
		case key.a:
			game.move( mouse, 'left' );
			break;

		case key.up:
		case key.w:
			game.move( mouse, 'up' );
			break;

		case key.right:
		case key.d:
			game.move( mouse, 'right' );
			break;

		case key.down:
		case key.s:
			game.move( mouse, 'down' );
			break;
	}

}

game.move = function( who, direction ) {
	if(mouse.lives > 0){
		var keepX = who.x;
		var keepY = who.y;
		if(who.type === 'player') { 
			// I'm going to use this for game.shoveBlockChain
			// since I don't want to pass direction through two functions
			who.direction = direction;
		}	
		
		newSquare = board.getSquare( who.x, who.y, direction );
		var newX = newSquare[0];
		var newY = newSquare[1];

		if(newX == -1) {
			// dont move...hit an edge
			return false;		
		} else if( board.squares[newX][newY] !== null ) {
			// collision...decide result
			if(this.collide(who, newX, newY)) {
				// Immobile obstruction. Don't move
				return false;
			}
		}
		// OK to move
		who.x = newX;
		who.y = newY;
		board.remove( keepX, keepY );
		board.place( who );	
	}	
};


game.start = function( number ) {
	game.readLevel( number );
	$(document).keydown( game.handleKey );
};

game.collide = function( movedObj, x, y ) {
	// @TODO: test if there is a bug when cat/yarn & mouse move to same square simultaneously
	if(movedObj.type === 'player') {
		switch ( board.squares[x][y] ) {
			case 'cat':
			case 'yarn':
				mouse.die();
				return true;   //don't execute move, next mouse re-appeared in safe zone.
				break;
			case 'sinkhole':
				mouse.stuck( x, y );  //Mouse is stuck for ten cat turns
				return false;  
				break;
	  		case 'trap':
	  			mouse.die();
	  			board.remove( x, y );   //remove trap from board
				return true;
			case 'block':
				if(this.shoveBlockChain( x, y )) {
					return false;
				} else {
					return true;
				}
			break;
			case 'rock':
				return true;
			break;
		}
	}

	// if a cat or yarnball hits the mouse, it dies. Those are the only other active objects
	if(board.squares[x][y] === 'player' ) {
		mouse.die();
		return false;  // no collision - mouse died, OK to move
	} else {
		// cat or yarn bounced into something else
		return true;
	}
}

game.shoveBlockChain = function( x, y ) {
	//find the end of the chain of blocks & check for obstruction
	results = this.findChainEnd( x, y );
	if(results[0] == false){
		// the chain of blocks is obstructed - can't move
		return false;
	}
	if(results[1] === 'sinkhole'){
		//um, just obliterate them with the mouse character
		return true;
	}
	// add block at chain end. Then let normal mouse move obliterate closest block
	x = results[2];
	y = results[3];
	game.blocks.push( block.init(x,y) );
	return true;
}

game.findChainEnd = function( x, y ) {
	//find the end of the chain of blocks
	var chainEnd = new Array;
	var newSquare = new Array;
	
	while(board.squares[x][y] === 'block'){
		newSquare = board.getSquare( x, y, mouse.direction );
		x = newSquare[0];
		y = newSquare[1];
	}
	
	chainEnd[0] = true;
	chainEnd[2] = x;
	chainEnd[3] = y;
	
	// x,y now points to whatever is at the end
	if(board.squares[x][y]) {
		// not null, so something other than space
		// @TODO: Here is where we really need the object map
		//			We need to be able to tell if something is movable or not
		//			and we can't until we can query a particular object
		// @TODO: Someone else should probably figure out how to move
		//			non-block objects at the end of a block chain
		switch ( board.squares[x][y] ) {
			//non-movable
			case 'trap':
			case 'rock':
			chainEnd[0] = false;
			return chainEnd;
			break;
			
			// for now, cat and yarn ball icons are erased by blocks. Oops.
			case 'sinkhole':
			chainEnd[1] = 'sinkhole';
			break;
		}
	} else {
		chainEnd[1] = 'space';
	}
	return chainEnd;
}


game.end = function() {
	/* stops cats moving after game ends - we'll need one for yarn too!
	// @TODO: should be a foreach..but we're not there yet */

	// @TODO: the following line never returns. Something's broke.
	cats.forEach( clearInterval( this.timer ) ); 
	alert( "Loser!");
}
game.readLevel = function( number ) {
	//get the requested level file
	$.getJSON('level'+number+'.json', function(level) {
	
		console.log(level);
		
		//set the grid size
		game.gridSize = board.init( level.board.x, level.board.y );
		
		//set the mouse starting place
		game.mouse = mouse.init(level.mouse.x, level.mouse.y);
		
		//cat position
		$.each(level.cats, function(){
			game.cats.push( cat.init(this.x, this.y ) );
		});
		
		//block position
		$.each(level.blocks, function(){
			game.blocks.push( block.init( this.x, this.y ) );
		});
		
		//rock position
		$.each( level.rocks, function(){
			game.rocks.push( rock.init( this.x, this.y ) );
		});
		
		//trap position
		$.each( level.traps, function(){
			//it's a trap!
			game.traps.push( trap.init( this.x, this.y ) );
		});

		//hole position
		$.each( level.holes, function(){
			game.holes.push( sinkhole.init( this.x, this.y ) );
		}); 
	});
}

/* Global variables we might need */
var key = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	w: 87,
	a: 65,
	s: 83,
	d: 68
}

$(function() {
	game.start( 0 );
});
