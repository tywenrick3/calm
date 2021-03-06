let bgsong;
let sky_color;
let light;
let index = true;
let clouds = [];
let oceans = [];
let mode = 0;
let drop;
let locked = false;
let xgrade;
let ygrade;
let sunsize = 300;

class Ocean {
	constructor(x, y, l, w, c) {
		this.x = x;
		this.y = y;
		this.l = l;
		this.w = w;
		this.c = c;
	}

	display() {
		fill(this.c);
		rect(this.x, this.y, this.l, this.w, this.c);
	}
}

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
	constructor(
		xPos = floor(random(0, width)),
		yPos = floor(random(0, height / 2 - 50)),
		l = floor(random(25, 175)),
		h = floor(random(25, 75)),
		speed = floor(random(1, 1.5)),
		r = floor(random(200, 255)),
		g = floor(random(200, 255)),
		b = floor(random(200, 255))
	) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speed = speed;
		this.l = l;
		this.h = h;
		this.r = r;
		this.b = b;
		this.g = g;
		let temp = random(0, 10);
		if (temp < 5) {
			this.speed *= -1;
		}
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
	if (mode == 0) {
		//startscreen
		start();
	}
	if (mode == 1) {
		//main
		main();
	}
}

function start() {
	background('#fef774');
	textAlign(CENTER);
	fill('black');
	textSize(72);
	textFont('adage-script-jf, sans-serif');
	text('calm', width / 2, height / 2);
	textFont('input-serif, serif');
	textSize(14);
	text('Press Enter', width / 2, height / 2 + 250);
	for (let i = 0; i < clouds.length; i++) {
		clouds[i].display();
		clouds[i].move();
		clouds[i].bounce();
	}
}

function main() {
	noStroke();
	xgrade = map(mouseX, 0, width, 0, 255);
	ygrade = map(mouseY, 0, width, 0, 255);
	oceangrade = color(26, ygrade, 243);

	let sungrade = color(243, xgrade, 32);
	//let ocean = new Ocean(0, height / 2, width, 300, oceangrade);

	background(sky_color);
	let sun = new Sun(sunsize, width / 2, height / 2, sungrade);

	sun.display();
	//ocean.display();

	fill(oceangrade);
	let temp = 300;
	rect(0, height / 2, 800, temp);

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
	if (keyCode == 32 && mode == 1) {
		switchSky();
	}
	if (keyCode == 13 && mode == 0) {
		mode = 1;
	}
	if (keyCode == 27 && mode == 1) {
		mode = 0;
	}
	if (keyCode == 84 && mode == 1) {
		drop = true;
	}
}

function mousePressed() {
	popcloud();
}

function mouseDragged() {
	sunsize = dist(width / 2, height / 2, mouseX, mouseY);
}

function popcloud() {
	clouds.pop();
	poof.setVolume(1);
	poof.play();
}

function setupButton() {
	let button = createButton('Reset');
	button.mousePressed(reset);
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
	drop = false;
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
