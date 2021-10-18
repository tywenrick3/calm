let bgsong;

let sky_color;

let light;

let index = true;

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
	bgsong = loadSound('assets/lovelysunset.m4a');
	poof = loadSound('assets/poof.mp3');
	light = loadSound('assets/light_switch.wav');
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
	let x = map(mouseX, 0, width, 0, 255);
	let y = map(mouseY, 0, width, 0, 255);
	let oceangrade = color(26, y, 243);
	let sungrade = color(243, x, 32);
	background(sky_color);

	let sun = new Sun(300, width / 2, height / 2, sungrade);
	let sun2 = new Sun(300, width / 2, height / 2, '#F2AE2E');

	sun.display();

	fill(oceangrade);
	rect(0, height / 2, 800, 300);

	for (let i = 0; i < clouds.length; i++) {
		clouds[i].display();
		clouds[i].move();
		clouds[i].bounce();
	}
}

function switchSky() {
	light.play();
	if (index) {
		sky_color = 40;
		index = false;
	} else {
		sky_color = color('#4DC3FF');
		index = true;
	}
}

function keyPressed() {
	if (keyCode == 32) {
		switchSky();
	}
}

function mousePressed() {
	popcloud();
}

function popcloud() {
	clouds.pop();
	poof.setVolume(1);
	poof.play();
}

function setupButton() {
	let button = createButton('Reset');
	button.mousePressed(reset);
	//button.mouseOver(changeColor);
	//button = select('.button');
	button.style('font-size', '16px');
	button.style('border-radius', '6px');
	button.style('background-color', 'gray');
	button.style('border', 'none');
	button.style('text-decoration', 'none');
	button.style('font-style', 'monospace');
	button.style('color', 'black');
	button.style('padding', '13px 28px');
	button.position(windowWidth / 2 - 40, height + 15);
}

function reset() {
	while (clouds.length > 0) {
		clouds.pop();
	}
	sky_color = color('#4DC3FF');
	bgsong.stop();
	bgsong.setVolume(0.1);
	song();
	num_of_clouds = floor(random(35, 60));
	for (let i = 0; i < num_of_clouds; i++) {
		clouds.push(new Cloud());
	}
}
