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
	cat.timer = setInterval( cat.move, 1000 );
};

cat.move = function( start, goal ){
	closedSet = [];
	openSet = [];
	openSet.append( start );
	cameFrom = [];
	
	gScore[start] = 0;
	fScore[start] = gScore[start] + .5;
	
	while( openSet.length < 0 ){
		sort( fScore );
		current = fScore[0];
		if( current === goal ){
			return reconstructPath( start, goal );
		}
		
		remove = openSet.indexOf( current );
		openSet.splice( remove, 1 );
		
		closedSet[ current ] = current;
		$.each( )
	}
}


/* old routine
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

function A*(start,goal)
     closedset := the empty set    // The set of nodes already evaluated.
     openset := {start}    // The set of tentative nodes to be evaluated, initially containing the start node
     came_from := the empty map    // The map of navigated nodes.
 
     g_score[start] := 0    // Cost from start along best known path.
     // Estimated total cost from start to goal through y.
     f_score[start] := g_score[start] + heuristic_cost_estimate(start, goal)
 
     while openset is not empty
         current := the node in openset having the lowest f_score[] value
         if current = goal
             return reconstruct_path(came_from, goal)
 
         remove current from openset
         add current to closedset
         for each neighbor in neighbor_nodes(current)
             tentative_g_score := g_score[current] + dist_between(current,neighbor)
             if neighbor in closedset
                 if tentative_g_score >= g_score[neighbor]
                     continue
 
             if neighbor not in openset or tentative_g_score < g_score[neighbor] 
                 came_from[neighbor] := current
                 g_score[neighbor] := tentative_g_score
                 f_score[neighbor] := g_score[neighbor] + heuristic_cost_estimate(neighbor, goal)
                 if neighbor not in openset
                     add neighbor to openset
 
     return failure
 
 function reconstruct_path(came_from, current_node)
     if current_node in came_from
         p := reconstruct_path(came_from, came_from[current_node])
         return (p + current_node)
     else
         return current_node
*/