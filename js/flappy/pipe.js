class Pipe {
	constructor() {
		this.x = width
		this.y = 0
		this.dist = 80
		this.yb = random(height-this.dist);
		this.w = 30;
	}

	setup() {
		this.x = width
		this.y = 0
		this.dist = 80
		this.yb = random(height-this.dist);
		this.w = 30;
	}

	update() {
		this.x -= 2;
	}

	draw() {
		// console.log(this.w)
		stroke(0);
		fill(0,255,0)
		rect(this.x, this.y, this.w, this.yb)
		rect(this.x, this.yb+this.dist, this.w, height)
	}
}