class Bird {
	constructor() {
		this.x = 50;
		this.y = height/2;
		this.w = 20;
		this.vy = 0;
		this.grav = 0.3;
		this.lastRot = 0;
	}

	flap() {
		this.vy = -5;
	}

	update() {
		this.vy += this.grav;
		this.y += this.vy
	}

	collide(pipe) {
		if(((pipe.x<this.x+this.w && this.x+this.w<pipe.x+pipe.w) || ((pipe.x<this.x && this.x<pipe.x+pipe.w))) && ( (pipe.y<this.y && this.y<pipe.y+pipe.yb) || (pipe.yb+pipe.dist<this.y && this.y<height) || ((pipe.y+this.w<this.y && this.y+this.w<pipe.y+pipe.yb) || (pipe.yb+pipe.dist<this.y+this.w && this.y+this.w<height)) )){
			console.log("DID");
			return true;
		}
		return false;
	}

	draw() {
		push();
		translate(this.x, this.y)
		this.lastRot = lerp(this.lastRot, map(this.vy, -5, 4, -1, 0.5), 0.2)
		rotate(this.lastRot);
		image(birdImg, 0,0,this.w,this.w);
		pop()
	}

	win(pipe) {
		if(this.x == pipe.x){
			return true;
		}
		return false;
	}
}