var sinkhole = {};

sinkhole.init = function(x,y) {
	sinkhole.symbol = '&#9732';
	sinkhole.type = 'sinkhole';
	sinkhole.movable = false;
	sinkhole.x = x;
	sinkhole.y = y;

	board.place( sinkhole );
};
