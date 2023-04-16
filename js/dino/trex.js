class Trex {
	constructor() {
		this.x = 20;
		this.y = height-80;
		this.vy = 0;
		this.lastRot = 0;
	}

	update() {
		if(this.y>= height-80){
		}else{
			this.vy += 0.3;
		}
		this.y += this.vy;
		this.y  = constrain(this.y, 0, height-80)

	}

	collide(tree) {
		if(((this.x < tree.x + tree.h && tree.x < this.x) || (this.x+40<tree.x+tree.h && tree.x<this.x+40))&&((tree.y<=this.y+40 && this.y+40 >= tree.y+tree.h) || (tree.y<=this.y && this.y >= tree.y+tree.h))){
			console.log("collide")
			return true;
		}
		return false;
	}

	jump() {
		if(this.y >= height-80) {
			this.vy = -7.5;
		}
	}

	draw() {
		push();
		translate(this.x, this.y);
		this.lastRot = lerp(this.lastRot, map(this.vy, -7.5, 7.5, -0.8, 0), 0.3);
		rotate(this.lastRot);
		image(dinoImg, 0,0,40,40);
		pop();
 }
}