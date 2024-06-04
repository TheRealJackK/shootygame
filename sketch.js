let crosshair, projectile, hitbox, zombies, humans, player, enemyCount

let screen = 0

let projectiles = 15

let reloading = false

let zombieSpeed = 0.5

let humanSpeed = 1

let healthPoints = 10

let score = 0

function setup() {
	new Canvas(500, 500);

	crosshair = new Sprite();
	crosshair.diameter = 5;
	crosshair.image = 'assets/crosshair.png'
	crosshair.opacity = 0
	crosshair.collider = 'none'

	player = new Sprite()
	player.layer = 2;
	player.image = 'assets/player.png'
	player.opacity = 0
	player.diameter = 20;
	player.x = width / 2
	player.y = 475;
	player.collider = 'static'

	hitbox = new Sprite()
	hitbox.layer = 1;
	hitbox.opacity = 0
	hitbox.stroke = 'none'
	hitbox.diameter = 50;
	hitbox.x = player.x
	hitbox.y = player.y
	hitbox.collider = 'static'

	projectile = new Sprite();
	projectile.color = 'black';
	projectile.diameter = 10;
	projectile.x = player.x;
	projectile.y = player.y +50;

	zombies = new Group();

	humans = new Group();

}

function draw() {

	// Game screen switching

	// Check if health points are 0 before ending game
    if (healthPoints <= 0) {
        screen = 2;
    }

    if (screen == 0) {
        menuScreen();
    } else if (screen == 1) {
        gameScreen();
    } else if (screen == 2) {
        endScreen();
    }

}

function displayValues() {
	// Health Points
	textSize(12.5)
	textAlign(LEFT)
	text('HP: ', 15, 20)
	text(healthPoints, 40, 20)

	// Display Ammunition
	text('Ammo: ', 150, 20)
	text(projectiles, 195, 20)

	// Display Ammunition Status on Player
	if(projectiles > 0) {
		text(projectiles, player.x, player.y - 30)
	} else {
		text('Reloading', player.x, player.y - 30)
	}

	// Enemy Count
	text('Enemies: ', 275, 20)
	text(humans.length + zombies.length, 335, 20)
	
	// Display Score
	text('Score: ', 425, 20)
	text(score, 470, 20)
}

function gunPlay() {
	// Change sprite opacity
	crosshair.opacity = 1
	player.opacity = 1    
	
	// Move player sprite with mouse
	player.x = mouse.x
	hitbox.x = mouse.x

	crosshair.x = mouseX;
	crosshair.y = mouseY;

	// Shooting mechanic
	if(mouse.pressed() && projectiles > 0) {
		// Remove 1 ammo
		projectiles = projectiles - 1

		// Place projectile in front of player
		projectile.y = player.y -20;
		projectile.x = player.x

		// Add velocity to fire the projectile
		projectile.vel.y = -10;

		// Reload
		if(projectiles == 0) {
			reloading == true;
			setTimeout(() => {
				projectiles = projectiles + 15
			}, 1000)
		}
	}
}

function detectCollision() {
	// Check for projectile collision with zombies
    zombies.forEach(zombie => {
        if (projectile.collides(zombie) && projectile.y <= 475) {
            zombie.remove(); // Remove zombie on collision
            projectile.y = player.y +50;
            projectile.x = player.x;
			projectile.vel.y = 0;
			projectile.vel.x = 0;

			healthPoints = healthPoints + 0.5
			score = Math.trunc(score + healthPoints / 4 * zombieSpeed)
        }
    });

	// Check for projectile collision with zombies
    humans.forEach(human => {
        if (projectile.collides(human) && projectile.y <= 475) {
            human.remove(); // Remove zombie on collision
            projectile.y = player.y +50;
            projectile.x = player.x;
			projectile.vel.y = 0;
			projectile.vel.x = 0;

			healthPoints = healthPoints + 0.5
			score = Math.trunc(score + healthPoints / 4 * humanSpeed)
        }
    });

	// Check if projectile missed and leaves the screen
	if(projectile.y <= 0) {
		projectile.y = player.y +50;
		projectile.x = player.x
		projectile.vel.y = 0;
		projectile.vel.x = 0;
	}
}

function spawnEnemies(group, count, speed) {
    for (let i = 0; i < count; i++) {
        let enemy = new Sprite();
        enemy.diameter = 20;
        enemy.x = random(50, width - 50);
        enemy.y = random(50, height / 2);
        enemy.speed = speed;
        group.add(enemy);
    }
}

function moveEnemies() {
	// Spawn and Respawn function
	if(zombies.length === 0 && humans.length === 0) {
		spawnEnemies(zombies, 5, zombieSpeed);
        spawnEnemies(humans, 5, humanSpeed);
        zombieSpeed += 0.1;
        humanSpeed += 0.1;
	}

	// Move zombies towards the player
    zombies.forEach(zombie => {
        let zombieAngle = atan2(player.y - zombie.y, player.x - zombie.x);
		zombie.color = 'red'
        zombie.vel.x = cos(zombieAngle) * zombieSpeed;
        zombie.vel.y = sin(zombieAngle) * zombieSpeed;

		// Remove enemy if hits player and decrement health point
		if(zombie.collides(hitbox)) {
			zombie.remove()
			
			//Remove health points if ememy hits player
			healthPoints = healthPoints -1;
		}
    });

	// Move humans towards the player
	humans.forEach(human => {
		let humanAngle = atan2(player.y - human.y, player.x - human.x);
		human.color = 'gray'
        human.vel.x = cos(humanAngle) * humanSpeed;
        human.vel.y = sin(humanAngle) * humanSpeed;

		// Remove enemy if hits player and decrement health point
		if(human.collides(hitbox)) {
			human.remove()

			//Remove health points if ememy hits player
			healthPoints = healthPoints - 1;
		}
	})
}

function menuScreen() {
	background('grey')

	text('Press Space To Start', width / 2, height / 2)
	textAlign('center')
	textSize(30)

	if(kb.presses(' ')) {
		screen = 1
	}
}

function gameScreen() {
	background('skyblue');

	displayValues();

	gunPlay();

	detectCollision();

	moveEnemies()
}

function endScreen() {
	background('grey')

	text('Score', width / 2, height / 4)
	text(score,  width / 2, height / 2)
	textAlign('center')
	textSize(50)

	crosshair.opacity = 0
	player.opacity = 0
}