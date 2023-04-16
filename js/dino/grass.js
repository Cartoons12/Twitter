class Grass {
	constructor() {
		this.setup();
	}

	setup() {
		this.h = random(20,50);
		this.x = width;
		this.y = height-(40+this.h);

	}

	update() {
		this.x -= 5;
		if(this.x <= -this.h) {
			this.setup();
		}
	}

	draw() {
		fill(0,255,0);

		image(treeImg, this.x, this.y, this.h, this.h)
	}
}