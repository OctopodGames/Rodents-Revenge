"use strict";

var key = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  w: 87,
  a: 65,
  s: 83,
  d: 68,
  n: 78 // temp cheat code to load level 1
};

var Game = function Game() {
  this.gameOn = true;
  this.mouse = {};
  this.board = {};
  this.cats = [];
  this.yarns = [];
  this.blocks = [];
  this.rocks = [];
  this.traps = [];
  this.sinkholes = [];
};

Game.prototype = {
  constructor: Game,
  
  start: function(number) {
    var self = this;
    
    document.game = self; // Necessary to handle keydown events
    this.loadLevel(0);
    this.placeObjects();
    //this.clock = setInterval("this.timer()", 1500);
    $(document).keydown(self.handleKey);
  },
  
  loadLevel: function(number) {
    var self = this;
    /** Read in level objects from file **/
    $.ajax({
      url: 'levels/level'+number+'.json',
      dataType: "json",
      async: false,
      success: function(level) {
        // Create the board
        self.board = new Board(level.board.x, level.board.y, self);
        // Create the mouse
        self.mouse = new Mouse(level.mouse.x, level.mouse.y, self)
        // Create the cats
        $.each(level.cats, function() {
          self.cats.push(new Cat(this[0], this[1], self));
        });
        // Create the blocks
        $.each(level.blocks, function() {
          self.blocks.push(new Block(this[0], this[1], self));
        });
        // Create the rocks
        $.each(level.rocks, function() {
          self.rocks.push(new Rock(this[0], this[1], self));
        });
        // Create the traps
        $.each(level.traps, function() {
          self.traps.push(new Trap(this[0], this[1], self));
        });
        // Create the sinkholes
        $.each(level.sinkholes, function() {
          self.sinkholes.push(new SinkHole(this[0], this[1], self));
        });
      }
    });
  },
  
  clearLevel: function(number) {
    this.mouse = {};
    this.board = {};
    this.cats = [];
    this.yarn = [];
    this.blocks = [];
    this.rocks = [];
    this.traps = [];
    this.sinkholes = [];
  },
  
  placeObjects: function() {
    var self = this;
    
    // Draw board
    self.board.draw();
    
    // Place objects on board
    self.board.place(this.mouse); // Place mouse
    $.each(self.cats, function() { // Place cats
      self.board.place(this);
    });
    $.each(self.blocks, function() { // Place blocks
      self.board.place(this);
    });
    $.each(self.rocks, function() { // Place rocks
      self.board.place(this);
    });
    $.each(self.traps, function() { // Place traps
      self.board.place(this);
    });
    $.each(self.sinkholes, function() { // Place sinkholes
      self.board.place(this);
    });
  },
  
  handleKey: function(e) {
    var self = document.game;
    
    if (self.mouse.movable == false) {
      return;
    }
    switch (e.keyCode) {
      case key.left:
      case key.a:
        self.move(self.mouse, 'west');
        break;
        
      case key.up:
      case key.w:
        self.move(self.mouse, 'north');
        break;
        
      case key.right:
      case key.d:
        self.move(self.mouse, 'east');
        break;
        
      case key.down:
      case key.s:
        self.move(self.mouse, 'south');
        break;
        
      case key.n:
        self.newLevel(1);
        break;
    }
  },
  
  timer: function() {
    var self = this;
    //timed automatic moving of cats/yarn - game.end stops it
    $.each(self.cats, function() {
      this.move(this);
    });
    $.each(self.yarns, function() {
      this.move(this);
    });
  },
  
  end: function() {
    // stops cats moving after game ends - we'll need one for yarn too!
    // @TODO: should be a foreach..but we're not there yet
    // @TODO: the following line never returns. Something's broke.
    clearInterval(game.clock); 
    alert("Loser!");
  },
    
  move: function(who, direction) {
    var self = this;
    
    if (self.gameOn) {
      var keepX = who.x;
      var keepY = who.y;
      if (who instanceof Mouse) { 
        // I'm going to use this for game.shoveBlockChain
        // since I don't want to pass direction through two functions
        who.direction = direction;
      }  
      var newSquare = self.board.getSquare(who.x, who.y, direction);
      var newX = newSquare[0];
      var newY = newSquare[1];
      if (newX == -1 || newY == -1) {
        return false; // dont move...hit an edge 
      } else if (self.board.squares[newX][newY] !== null) {
        // collision...decide result
        if (self.collide(who, newX, newY)) {
          // Immobile obstruction. Don't move
          return false;
        }
      }
      // OK to move
      who.x = newX;
      who.y = newY;
      self.board.remove(keepX, keepY);
      self.board.place(who);
      return true;  
    }
  },
  
  collide: function(movedObj, x, y) {
    // @TODO: test if there is a bug when cat/yarn & mouse move to same square simultaneously
    if (movedObj.type === 'player') {
      switch (board.squares[x][y]) {
      case 'cat':
      case 'yarn':
        mouse.die();
        return true;   //don't execute move, next mouse re-appeared in safe zone.
        break;
      case 'sinkhole':
        mouse.stuck(x, y);  //Mouse is stuck for ten cat turns
        return false;  
        break;
        case 'trap':
        mouse.die();
        board.remove(x, y);   //remove trap from board
        return true;
      case 'block':
      if (this.shoveBlockChain(x, y)) {
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
    if (board.squares[x][y] === 'player') {
      mouse.die();
      return false;  // no collision - mouse died, OK to move
    } else {
      // cat or yarn bounced into something else
      return true;
    }
  },
  
  shoveBlockChain: function(x, y) {
    //find the end of the chain of blocks & check for obstruction
    results = this.findChainEnd(x, y);
    if (results[0] == false){
      // the chain of blocks is obstructed - can't move
      return false;
    }
    if (results[1] === 'sinkhole'){
      //um, just obliterate them with the mouse character
      return true;
    }
    // add block at chain end. Then let normal mouse move obliterate closest block
    x = results[2];
    y = results[3];
    game.blocks.push(block.init(x,y));
    return true;
  },
  
  findChainEnd: function(x, y) {
    //find the end of the chain of blocks
    var chainEnd = new Array;
    var newSquare = new Array;
    while(board.squares[x][y] === 'block'){
      newSquare = board.getSquare(x, y, mouse.direction);
      x = newSquare[0];
      y = newSquare[1];
    }
    chainEnd[0] = true;
    chainEnd[2] = x;
    chainEnd[3] = y;
    // x,y now points to whatever is at the end
    if (board.squares[x][y]) {
      // not null, so something other than space
      // @TODO: Here is where we really need the object map
      //    We need to be able to tell if something is movable or not
      //    and we can't until we can query a particular object
      // @TODO: Someone else should probably figure out how to move
      //    non-block objects at the end of a block chain
      switch (board.squares[x][y]) {
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
};

/* START GAME */
$(function() {
  var game = new Game()
  game.start(0);
});
