const NUM_ENEMIES = 5;
let winLabel = document.querySelector('#wins-label');
let collisionsLabel = document.querySelector('#collisions-label');

// Enemies our player must avoid
// Enemy Constructor
function Enemy() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	// Each time we create a new Enemy, it has a random location and speed
	this.newRandomValues();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	if(this.x > 500)
		this.newRandomValues();
	
	// Returns true if the given coordinates "collide"
	if(allEnemies.some(function (enemy) {
		let xDiff = Math.abs(enemy.x - player.x);
		let yDiff = Math.abs(enemy.y - player.y);
		return (xDiff < 70 && yDiff < 70); // COLLISION
	})) {
		player.collide();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Generates new random values for x, y, and speed
Enemy.prototype.newRandomValues = function() {
	this.x = getRandomInt(300) - 400; // -400 to -101
	this.y = (getRandomInt(3) * 83) + 60; // 60, 143, or 226
	this.speed = getRandomInt(500) + 70 // 70 to 569
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
	this.sprite = 'images/char-boy.png'; //TODO: make this change based on user preference
	this.resetLoc(); //sets x and y to initial position
	this.wins = 0;
	this.collisions = 0;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
// ...I obviously never used this but it seems to be working fine.
// Did I basically implement what you had in mind here somewhere else
// or am I missing something?
Player.prototype.update = function(dt) {
	
};

// Draw the player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player according to input (allowedKeys)
// Parameter: allowedKeys, the key which the user pressed
Player.prototype.handleInput = function(allowedKeys) {
	let tempX = this.x;
	let tempY = this.y;
	switch(allowedKeys) {
		case 'up': tempY -= 83;
			break;
		case 'down': tempY += 83;
			break;
		case 'right': tempX += 101;
			break;
		case 'left': tempX -= 101;
	}
	this.checkLocation(tempX, tempY);
};

// Checks if the given x and y are valid (on the screen or the water)
// If the location touches the water, the player is reset to the starting position
// Parameters: tempX and tempY, the potential location of the player
Player.prototype.checkLocation = function(tempX, tempY) {
	if(tempY < 0) // touching the water--WIN!
		this.win();
	if(tempX < 500 && tempX > -3 && tempY < 400 && tempY > 0) { //on the screen
		this.x = tempX;
		this.y = tempY;
	}
};

// Resets the player to it's initial location
Player.prototype.resetLoc = function() {
	this.x = 200;
	this.y = 380;
};

// The Player has won! (touched the water) Reset their location, display win text,
// and (eventually) increment win counter
Player.prototype.win = function() {
	this.resetLoc();
	this.wins++;
	winLabel.innerHTML = 'Wins: ' + this.wins;
};

// Resets the player's location and increments the number of collisions
Player.prototype.collide = function() {
	this.resetLoc();
	this.collisions++;
	collisionsLabel.innerHTML = 'Collisions: ' + this.collisions;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
createEnemies();
let player = new Player();

// Adds NUM_ENEMIES Enemies to allEnemies array
function createEnemies() {
	for(let i = 0; i < NUM_ENEMIES; i++) {
		allEnemies.push(new Enemy());
	}
}

// Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// returns a random int from 0 to max-1
// Parameter: max, number denoting the range
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});