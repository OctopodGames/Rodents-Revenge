/**
 * object_model.js
 * Joe Cormier [03/04/13]
 * The different object models for rodents revenge
 * Objects: Board, Square, Player, Game
 **/
/********** Board Object Model **********/
/**
 * Board
 * This should have functions to draw, and init.
 * **/
var Board = {
	function draw( rows, cols ){}
}

/********** Square Object Model **********/
/**
 * Square
 * This should have functions to get and set what's in the square, and a draw function
 * **/
var Square = {
	//square can be either blank, cheese, rock, etc...
}

/********** Moveable Object Model **********/
/**
 * Moveable
 * This is a special square class that will draw and enable a moveable object
 * This needs functions to get the type of moveable, create the movement, and handle collision
 * **/
var Moveable = {
//character can be either mouse, cat, yarn, etc...
}

/********** Game Object Model **********/
/**
 * Game
 * This needs funtions to start the game. It will probably create a board object.
 * **/
var Game = {
}

function Game() {}
