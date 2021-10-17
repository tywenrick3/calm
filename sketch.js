let bgsong;

let clouds = [];

class Sun {
	constructor(radius, x, y, c = '#F2921D') {
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.c = c;
	}

	display() {
		noStroke();
		fill(this.c);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}

class Cloud {
	constructor() {
		this.xPos = floor(random(0, width));
		this.yPos = floor(random(0, height / 2 - 50));
		this.speed = floor(random(1, 1.5));
		let temp = random(0, 10);
		if (temp < 5) {
			this.speed *= -1;
		}
		this.l = floor(random(25, 125));
		this.h = floor(random(25, 75));
		this.r = floor(random(200, 255));
		this.b = floor(random(200, 255));
		this.g = floor(random(200, 255));
	}

	move() {
		this.xPos += this.speed;
	}

	display() {
		let c = color(this.r, this.b, this.g);
		c.setAlpha(150);
		fill(c);
		rect(this.xPos, this.yPos, this.l, this.h);
	}

	bounce() {
		if (this.xPos > width - 20) {
			this.speed *= -1;
		}
		if (this.xPos < 20) {
			this.speed *= -1;
		}
	}
}

//^^^^^Objects^^^^^

function preload() {
	bgsong = loadSound(
		'560450__migfus20__calming-background-music-guitar-loop.mp3'
	);
}

function song() {
	bgsong.loop();
}

function setup() {
	createCanvas(800, 600);
	setupButton();
	reset();
}

function draw() {
	noStroke();
	let sky_color = color('#4DC3FF');
	background(sky_color);

	sun = new Sun(300, width / 2, height / 2);
	sun2 = new Sun(300, width / 2, height / 2, '#F2AE2E');

	sun.display();

	let ocean_color = color('#177EB2');
	fill(ocean_color);
	rect(0, height / 2, 800, 300);

	for (let i = 0; i < clouds.length; i++) {
		clouds[i].display();
		clouds[i].move();
		clouds[i].bounce();
	}
}

function mousePressed() {
	clouds.pop();
}

function setupButton() {
	let button = createButton('Reset');
	button.mousePressed(reset);
	button.position(width / 2, height + 5);
}

function reset() {
	while (clouds.length > 0) {
		clouds.pop();
	}
	bgsong.stop();
	bgsong.setVolume(0.1);
	song();
	num_of_clouds = floor(random(35, 60));
	for (let i = 0; i < num_of_clouds; i++) {
		clouds.push(new Cloud());
	}
}
