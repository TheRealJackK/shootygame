let crosshair, hitbox, zombies, humans, boss, player, enemyCount, ammoSprite, bulletCasing, bossHealthBar

let gunshot, pistolReload, shotgunShot, shotgunReload, akGunshot, akReload, music1, music2, music3 // Sounds

let map1 // Map File

let road, rSide, lSide, grass // Tiles

let healthBox, shotgun, ak47, doubleAk47, miniGun // Upgrades

let healthBoxImage, shotgunImage, ak47Image, doubleAk47Image, miniGunImage // Upgrade Images

let activeWeapon = 0

let randNum

let screen = 0

let projectiles

let ammoCount = 15

let roundNum = 0

let fastZombieSprites

let slowZombieSprites

let zombieSpeed = 0.5

let humanSpeed = 1

let healthPoints = 10

let bossHealth

let bossSpeed = 0.1

let score = 0

function preload() {
	// Map
	map1 = loadStrings('maps/map1.txt')
	// Sprites
	loadImage('assets/playerx64.png')
	loadImage('assets/crosshair.png')
	loadImage('assets/bullet.png')
	loadImage('assets/bullet-casing.png')
	loadImage('assets/zombie-slow.png', 'assets/zombie-slow-2.png', 'assets/zombie-slow-3.png', 'assets/zombie-slow-4.png')
	loadImage('assets/zombie-fast.png', 'assets/zombie-fast-2.png', 'assets/zombie-fast-3.png', 'assets/zombie-fast-4.png')
	fastZombieSprites = ['assets/zombie-slow.png', 'assets/zombie-slow-2.png', 'assets/zombie-slow-3.png', 'assets/zombie-slow-4.png']
	slowZombieSprites = ['assets/zombie-fast.png', 'assets/zombie-fast-2.png', 'assets/zombie-fast-3.png', 'assets/zombie-fast-4.png']
	loadImage('assets/grass.png')
	loadImage('assets/road.png')
	loadImage('assets/road-left.png')
	loadImage('assets/road-right.png')
	// Sounds & Music
	soundFormats('mp3')
	gunshot = loadSound('assets/sounds/gunshot.mp3')
	pistolReload = loadSound('assets/sounds/pistol-reload.mp3')
	shotgunShot = loadSound('assets/sounds/shotgun-shot.mp3')
	shotgunReload = loadSound('assets/sounds/shotgun-reload.mp3')
	akGunshot = loadSound('assets/sounds/ak-gunshot.mp3')
	akReload = loadSound('assets/sounds/ak-reload.mp3')
	music1 = loadSound('assets/sounds/palmtree-panic.mp3')
	music2 = loadSound('assets/sounds/metalic-madness.mp3')
	music3 = loadSound('assets/sounds/final-fever.mp3')
	// Upgrade Sprites
	healthBoxImage = loadImage('assets/health-box.png')
	shotgunImage = loadImage('assets/shotgun.png')
	ak47Image = loadImage('assets/ak.png')
	doubleAk47Image = loadImage('assets/double-ak.png')
	miniGunImage = loadImage('assets/minigun.png')
}

function setup() {
	// new Canvas(1500, 900);
	createCanvas(1500, 900);

	// Tile Groups
	
	// Grass Tiles
	grass = new Group();
	grass.layer = 3
	grass.opacity = 0
	grass.collider = 'none'
	grass.w = width / 8;
	grass.h = height / 8;
	grass.tile = '1'
	grass.image = 'assets/grass.png'

	// Road left Tiles
	lSide = new Group();
	lSide.layer = 3
	lSide.opacity = 0
	lSide.collider = 'none';
	lSide.w = width / 8;
	lSide.h = height / 8;
	lSide.tile = '2';
	lSide.image = 'assets/road-left.png'

	// Road right Tiles
	rSide = new Group();
	rSide.layer = 3
	rSide.opacity = 0
	rSide.collider = 'none';
	rSide.w = width / 8;
	rSide.h = height / 8;
	rSide.tile = '3';
	rSide.image = 'assets/road-right.png'
	
	// Road Tiles
	road = new Group();
	road.layer = 3
	road.opacity = 0
	road.collider = 'none';
	road.w = width / 8;
	road.h = height / 8;
	road.tile = '4'
	road.image = 'assets/road.png'

	// Draw Tiles
    tilesGroup = new Tiles(
        map1,
        30,
        80,
        64,
        64
    );

	// Sprites

	// Crosshair
	crosshair = new Sprite();
	crosshair.layer = 4
	crosshair.diameter = 5;
	crosshair.image = 'assets/crosshair.png'
	crosshair.opacity = 0
	crosshair.collider = 'none'

	// Player
	player = new Sprite()
	player.layer = 3;
	player.image = 'assets/playerx64.png'
	player.opacity = 0
	player.diameter = 20;
	player.x = width / 2
	player.y = height - 50;
	player.collider = 'static'

	// Player hitbox
	hitbox = new Sprite()
	hitbox.layer = 2;
	hitbox.opacity = 0
	hitbox.stroke = 'none'
	hitbox.diameter = 50;
	hitbox.x = player.x
	hitbox.y = player.y
	hitbox.collider = 'static'

	// Ammo status box
	ammoSprite = new Sprite();
	ammoSprite.color = 'none'
	ammoSprite.stroke = 'none'
	ammoSprite.layer = 5
	ammoSprite.opacity = 0
	ammoSprite.collider = 'none'
	ammoSprite.textSize = 20

	// Bosses Health Bar
	bossHealthBar = new Sprite();
	bossHealthBar.color = 'lime'
	bossHealthBar.layer = 5
	bossHealthBar.opacity = 0
	bossHealthBar.collider = 'none'
	bossHealthBar.textSize = 20
	
	// Projectiles Group
	projectiles = new Group()
	projectiles.image = 'assets/bullet.png';
	projectiles.diameter = 10;
	projectiles.life = 22
	projectiles.y = player.y - 30
	projectiles.vel.y = -25

	// Bullet casing
	bulletCasing = new Group();
	bulletCasing.image = 'assets/bullet-casing.png'
	bulletCasing.life = 30;
	bulletCasing.collider = 'none'
	bulletCasing.rotation = 360;
	bulletCasing.rotationSpeed = 10;

	// Health Box
	healthBox = new Group();

	// Gun Upgrades

	// Shotgun
	shotgun = new Group();

	// AK
	ak47 = new Group();

	// DoubleAK
	doubleAk47 = new Group();

	// Minigun
	miniGun = new Group();

	// Enemy Groups

	// Slow Zombies
	zombies = new Group();

	// Fast Zombies
	humans = new Group();

	// Boss Zombies
	boss = new Group()

	// Set Music Volume
	music1.setVolume(0.35)
	music2.setVolume(0.35)
	music3.setVolume(0.35)

	// music2.loop()

	shotgunShot.setVolume(0.6)
	akGunshot.setVolume(0.4)
}

function draw() {
	// Game screen switching
	background('grey')

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
	textSize(25)
	textAlign(LEFT)
	text('HP: ', width / 8 * 2, 35)
	text(healthPoints, width / 8 * 2 + 50, 35)

	// Display Ammunition
	text('Round: ', width / 8 * 3, 35)
	text(roundNum, width / 8 * 3 + 85, 35)

	// Enemy Count
	text('Enemies: ', width / 8 * 4, 35)
	text(humans.length + zombies.length, width / 8 * 4 + 110, 35)
	
	// Display Score
	text('Score: ', width / 8 * 5, 35)
	text(score, width / 8 * 5 + 80, 35)

	// Display Ammunition Status on Player
	ammoSprite.x = player.x + 60
	ammoSprite.y = player.y - 30
	ammoSprite.opacity = 1
	if(ammoCount > 0) {
		ammoSprite.text = ammoCount;
		ammoSprite.w = 40
		ammoSprite.h = 20
	} else {
		ammoSprite.text = 'Reloading'
		ammoSprite.x = player.x + 70
		ammoSprite.w = 100;
	}

	// Display Bosses Health Bar
	bossHealthBar.w = 200
	bossHealthBar.h = 20
	if(bossHealth > 0) {
		bossHealthBar.x = width / 2
		bossHealthBar.y = 100;
		bossHealthBar.text = bossHealth 
	}
}

function gunPlay() {    
	// Move player sprite with mouse
	player.x = mouse.x
	hitbox.x = mouse.x

	crosshair.x = mouseX;
	crosshair.y = mouseY;

	// Shooting mechanic
	if(activeWeapon == 0) {
		starterWeapon()
	} else if(activeWeapon == 1) {
		shotgunUpgrade()
	} else if(activeWeapon == 2) {
		akUpgrade()
	} else if(activeWeapon == 3) {
		doubleAkUpgrade()
	} else if(activeWeapon == 4) {
		minigunUpgrade()
	}
}

function starterWeapon() {
	if(mouse.pressed() && ammoCount > 0) {
		// Remove 1 ammo
		ammoCount = ammoCount - 1
		// Create new projectile in group
		let newProjectile = new projectiles.Sprite()
		// Move projecile in accordance to player
		newProjectile.x = player.x

		// Gun sound
		gunshot.play()

		// Automatic Reload
		if(ammoCount <= 0) {
			pistolReload.play()
			setTimeout(() => {
				ammoCount = ammoCount + 15
			}, 1000)
		}

		spawnBulletCasing()
	}
}

function shotgunUpgrade() {
	if(mouse.pressed() && ammoCount > 0) {
		// Change player sprite
		player.image = 'assets/player-shotgun.png'

		// Remove 3 ammo
		ammoCount = ammoCount - 1

		// Projectile
		for (let i = 0; i < 8; i++) {
			let newProjectile = new projectiles.Sprite()
			newProjectile.amount = 8;
			newProjectile.x = player.x
			newProjectile.vel.x = random(-15, 15)
			newProjectile.vel.y = random(-25, -20)
		}

		// Gun sound
		shotgunShot.play()

		// Automatic Reload
		if(ammoCount <= 0) {
			shotgunReload.play()
			setTimeout(() => {
				ammoCount = ammoCount + 12
			}, 1500)
		}

		spawnBulletCasing()
	}
}

function akUpgrade() {
	// Change player sprite
	player.image = 'assets/player-ak.png'

	if(mouse.pressing() && ammoCount > 0) {
		// Remove 1 ammo
		ammoCount = ammoCount - 1

		// Change range
		projectiles.life = 30;
		
		// Projectile
		let newProjectile = new projectiles.Sprite()
		newProjectile.x = player.x

		// Gun sound
		akGunshot.play()

		// Automatic Reload
		if(ammoCount <= 0) {
			akReload.play()
			setTimeout(() => {
				ammoCount = ammoCount + 60
			}, 2500)
		}

		spawnBulletCasing()
	}
}

function doubleAkUpgrade() {
	// Change player sprite
	player.image = 'assets/player-doubleak.png'
	
	if(mouse.pressing() && ammoCount > 0) {
		// Remove 1 ammo
		ammoCount = ammoCount - 1

		// Change range
		projectiles.life = 35;
		
		// Projectile
		let newProjectile = new projectiles.Sprite()
		newProjectile.x = player.x - 12.5

		// Second projectile
		let newProjectile2 = new projectiles.Sprite()
		newProjectile2.x = player.x + 12.5

		// Gun sound
		gunshot.play()

		// Automatic Reload
		if(ammoCount <= 0) {
			akReload.play()
			setTimeout(() => {
				ammoCount = ammoCount + 120
			}, 3000)
		}

		spawnBulletCasing()
	}
}

function minigunUpgrade() {
	if(mouse.pressing() && ammoCount > 0) {
		// Change player sprite
		player.image = 'assets/player-minigun.png'

		// Remove 3 ammo
		ammoCount = ammoCount - 1

		// Projectile
		for (let i = 0; i < 5; i++) {
			let newProjectile = new projectiles.Sprite()
			newProjectile.amount = 5;
			newProjectile.x = player.x
			newProjectile.vel.x = random(-5, 5)
		}

		// Gun sound
		gunshot.play()

		// Automatic Reload
		if(ammoCount <= 0) {
			akReload.play()
			setTimeout(() => {
				ammoCount = ammoCount + 300
			}, 5000)
		}

		spawnBulletCasing()
	}
}

function spawnBulletCasing() {
	// Bullet casing
	let newBulletCasing = new bulletCasing.Sprite()

	newBulletCasing.y = player.y - 10
	newBulletCasing.x = player.x + 10
	newBulletCasing.vel.y = -2
	newBulletCasing.vel.x = 2	
}

function spawnUpgrades(group, count, image) {
	for (let i = 0; i < count; i++) {
        let upgrade = new Sprite();
        upgrade.diameter = 50;
        upgrade.x = random(50, width - 50);
        upgrade.y = height / 2
		upgrade.layer = 3
		upgrade.image = image
        group.add(upgrade);
    }
}

function spawnEnemies(group, count, speed, spriteArray) {
    for (let i = 0; i < count; i++) {
        let enemy = new Sprite();
        enemy.diameter = 50;
        enemy.x = random(50, width - 50);
        enemy.y = random(50, height / 4 + 100);
        enemy.speed = speed;
		enemy.image = random(spriteArray);
		enemy.layer = 3
        group.add(enemy);
    }
}

function spawnBoss(group, count, speed) {
    for (let i = 0; i < count; i++) {
        let bossEnemy = new Sprite();
        bossEnemy.diameter = 200;
        bossEnemy.x = random(50, width - 50);
        bossEnemy.y = 100;
        bossEnemy.speed = speed;
		bossEnemy.layer = 3
		group.add(bossEnemy);
    }
}

function moveEnemies() {
	// Move zombies towards the player
    zombies.forEach(zombie => {
        let zombieAngle = atan2(player.y - zombie.y, player.x - zombie.x);
        zombie.vel.x = cos(zombieAngle) * zombieSpeed;
        zombie.vel.y = sin(zombieAngle) * zombieSpeed;
    });

	// Move humans towards the player
	humans.forEach(human => {
		let humanAngle = atan2(player.y - human.y, player.x - human.x);
        human.vel.x = cos(humanAngle) * humanSpeed;
        human.vel.y = sin(humanAngle) * humanSpeed;
	})

	// Move boss towards the player
	boss.forEach(newBoss => {
		let bossAngle = atan2(player.y - newBoss.y, player.x - newBoss.x);
		newBoss.vel.x = cos(bossAngle) * zombieSpeed;
        newBoss.vel.y = sin(bossAngle) * zombieSpeed;

		// Set sprite
		newBoss.image = 'assets/zombie-boss.png'

		// Place health bar above boss
		bossHealthBar.x = newBoss.x
		bossHealthBar.y = newBoss.y - 120
	})
}

function detectCollision() {
	// Check for projectile collision with zombies
    zombies.forEach(zombie => {
        if (projectiles.overlaps(zombie)) {
            zombie.remove(); // Remove zombie on collision
			score = Math.trunc(score + healthPoints / 4 * zombieSpeed) // Add score
        }

		// Remove enemy if hits player and decrement health point
		if(zombie.collides(hitbox)) {
			zombie.remove()

			background('red')
			
			// Change tile opacity
			grass.opacity = 0.4
			lSide.opacity = 0.4
			rSide.opacity = 0.4
			road.opacity = 0.4
			
			//Remove health points if ememy hits player
			healthPoints = healthPoints -1;
		}
    });

	// Check for projectile collision with zombies
    humans.forEach(human => {
        if (projectiles.overlaps(human)) {
            human.remove(); // Remove zombie on collision
			score = Math.trunc(score + healthPoints / 4 * humanSpeed) // Add score
        }

		// Remove enemy if hits player and decrement health point
		if(human.collides(hitbox)) {
			human.remove()

			background('red')

			// Change tile opacity
			grass.opacity = 0.4
			lSide.opacity = 0.4
			rSide.opacity = 0.4
			road.opacity = 0.4

			//Remove health points if ememy hits player
			healthPoints = healthPoints - 1;
		}
    });

	boss.forEach(newBoss => {
		projectiles.forEach(projectile => {
			if(projectile.collides(newBoss)) {
				// Remove health points from boss
				bossHealth = bossHealth - 1
				
				// Remove projectile after boss has been hit
				projectile.remove()

				// Decrease boss speed
				bossSpeed = bossSpeed - 0.01

				// Remove boss when health is depleted
				if(bossHealth <= 0) {
					newBoss.remove()
					bossHealthBar.opacity = 0
					score = score + 1000
				}
			}
		})

		if(newBoss.collides(hitbox)) {

			background('red')

			// Change tile opacity
			grass.opacity = 0.4
			lSide.opacity = 0.4
			rSide.opacity = 0.4
			road.opacity = 0.4

			//Remove health points if ememy hits player
			healthPoints = healthPoints - 1;
		}
	})

	healthBox.forEach(newBox => {
		if(projectiles.overlaps(newBox)) {
			newBox.remove()
			healthPoints = healthPoints + 5
		}
	})

	shotgun.forEach(newGun => {
		if(projectiles.overlaps(newGun)) {
			newGun.remove()
			activeWeapon = 1
			player.image = 'assets/player-shotgun.png'
		}
	})

	ak47.forEach(newGun => {
		if(projectiles.overlaps(newGun)) {
			newGun.remove()
			activeWeapon = 2
			player.image = 'assets/player-ak.png'
		}
	})

	doubleAk47.forEach(newGun => {
		if(projectiles.overlaps(newGun)) {
			newGun.remove()
			activeWeapon = 3
			player.image = 'assets/player-doubleak.png'
		}
	})

	miniGun.forEach(newGun => {
		if(projectiles.overlaps(newGun)) {
			newGun.remove()
			activeWeapon = 4
			player.image = 'assets/player-minigun.png'
		}
	})
}

function progressRound() {
	// Set enemy count
	enemyCount = zombies.length + humans.length;

	// Progress to next round
	if(enemyCount == 0) {
		// Add round when all enemies are killed
		roundNum = roundNum + 1;
		
		// Spawn in enemies
		spawnEnemies(zombies, healthPoints / 8, zombieSpeed, slowZombieSprites);
		spawnEnemies(humans, healthPoints / 8, humanSpeed, fastZombieSprites);
		
		// Increase speed every round
		zombieSpeed = zombieSpeed + 0.03
		humanSpeed = humanSpeed + 0.03

		// Generate random number
		randNum = random(1, 5)
		if(randNum > 2 && randNum < 3) {
			spawnUpgrades(healthBox, 1, healthBoxImage)
		}

		if(score >= 5000 && randNum > 2 && randNum < 3) {
			spawnUpgrades(shotgun, 1, shotgunImage)
		} else if(score >= 20000 && randNum > 2 && randNum < 3) {
			spawnUpgrades(ak47, 1, ak47Image)
		} else if(score >= 100000 && randNum > 2 && randNum < 3) {
			spawnUpgrades(doubleAk47, 1, doubleAk47Image)
		} else if(score >= 1000000 && randNum > 2 && randNum < 3) {
			spawnUpgrades(miniGun, 1, miniGunImage)
		}

	}

	// Spawn boss every 10 rounds
	if(roundNum % 10 == 0 && enemyCount == 0) {
		spawnBoss(boss, 1, bossSpeed)
		bossHealth = healthPoints / 2
		bossHealthBar.opacity = 1
	}
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
	displayValues();

	cursor('none')

	// Change sprite opacity
	crosshair.opacity = 1
	player.opacity = 1

	// Change tile opacity
	grass.opacity = 1
	lSide.opacity = 1
	rSide.opacity = 1
	road.opacity = 1

	gunPlay();

	detectCollision();

	moveEnemies();

	progressRound();
}

function endScreen() {
	background('grey')

	cursor(ARROW)

	textAlign('center')
	textSize(50)
	text('Score', width / 2, height / 8)
	text(score,  width / 2, height / 5)
	text('Rounds Completed', width / 2, height / 4)
	text(roundNum, width / 2, height / 2)
	textSize(30)
	text('Reload Page To Restart', width / 2, height / 1.5 )

	crosshair.opacity = 0
	player.opacity = 0
	ammoSprite.opacity = 0
	zombies.remove()
	humans.remove()
	
	// Change tile opacity
	grass.opacity = 0
	lSide.opacity = 0
	rSide.opacity = 0
	road.opacity = 0
}