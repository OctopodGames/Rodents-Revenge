/**
 * object_model.js
 * Joe Cormier [03/04/13]
 * The different object models for rodents revenge
 * Objects: Board, Square, Player, Game
 **/
/********** Board Object Model **********/
/**
 * Board
 * parameters: int rows, int cols
 * returns board
 * **/
function Board( rows, cols ){}
Board.prototype.newBoard = function () {}

/********** Square Object Model **********/
/**
 * Square
 * parameters: int block
 * returns: the elements for the square to draw 
 * **/
function Square( block ) {
	//square can be either blank, cheese, rock, etc...
}
Square.prototype.newSquare() {}

/********** Character Object Model **********/
/**
 * Character
 * parameters: int being
 * returns: a moving object
 * **/
function Character( being ) {
	//character can be either mouse, cat, yarn, etc...
}
Character.prototype.newCharacter() {}

/********** Game Object Model **********/
/**
 * Game 
 * parameters: none
 * returns: a game
 * **/
function Game() {}
Game.prototype.newGame() {}
