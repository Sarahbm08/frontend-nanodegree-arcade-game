const NUM_ENEMIES = 5;

// Enemies our player must avoid
// Enemy Constructor
function Enemy() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	this.y = 0;
	this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// TODO: handle collision with the Player

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
	this.sprite = 'images/char-cat-girl.png'; //TODO: make this change based on user preference
	this.x = 0;
	this.y = 0;
}

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
	
}

// Draw the player on the screen
// THOUGHT TO ADD LATER? : make a basic "render" function to render both players and enemies
Player.prototype.render = function() (
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move player according to input (allowedKeys)
// Parameter: allowedKeys, the key which the user pressed
Player.prototype.handleInput = function(allowedKeys) {
	// TODO: keys to handle: up, down, left, right
	// limitations: cannot move off screen, reach water and the games resets by moving the player to the initial location
}

// Resets the player to it's initial location
Player.prototype.resetLoc = function() {
	this.x = 0;
	this.y = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = {};
for(let i = 0; i < NUM_ENEMIES; i++)
	allEnemies.push(new Enemy());
let player = new Player();


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
