const NUM_ENEMIES = 5;

// Enemies our player must avoid
// Enemy Constructor
function Enemy(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	if(this.x > 500) //TODO: randomize position off screen, and randomize a new speed
		this.x = -100; //reset
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
	this.sprite = 'images/char-boy.png'; //TODO: make this change based on user preference
	this.x = 200;
	this.y = 380;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
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
	console.log("tempX: " + tempX + " tempY: " + tempY);
	this.checkLocation(tempX, tempY);
};

// Checks if the given x and y are valid (on the screen or the water)
// If the location touches the water, the player is reset to the starting position
// Parameters: tempX and tempY, the potential location of the player
Player.prototype.checkLocation = function(tempX, tempY) {
	if(tempY < 0) // touching the water
		this.resetLoc();
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-150, 60, 110), new Enemy(-150, 143, 80), new Enemy(-150, 226, 55),
				  new Enemy(-150, 60, 330), new Enemy(-150, 143, 250), new Enemy(-150, 226, 190)];
/*for(let i = 0; i < NUM_ENEMIES; i++)
	allEnemies.push(new Enemy());*/
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
