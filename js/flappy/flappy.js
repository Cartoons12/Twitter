let states = ["wait", "play"];
let state;
let score = 0;
let write = true;
let backImg;
let birdImg;

function preload() {
	backImg = loadImage("https://i.ibb.co/xF0Fgcr/back.jpg");
	birdImg = loadImage("https://i.ibb.co/5G3yTy7/bird.png")
}

function setup() {
  createCanvas(288, 512);
  bird = new Bird();
  pipe = new Pipe();
  state = states[0];
}

function draw() {
	if(state == states[0]) {
		pipe.draw();
		bird.draw();
	}else{
		background(0);
		image(backImg, 0, 0, width, height)

		fill(255);
		textSize(50);
		text(score,width/2,50)

		if(bird.collide(pipe) || bird.y > height || bird.y < 0){
			gameOver();
		}

		if(bird.win(pipe)){
			score++;
		}

		if(pipe.x+pipe.w < 0){
			pipe.setup();
		}

		pipe.update();
		bird.update();

		pipe.draw();
		bird.draw();
		}

	}

function keyPressed() {
	if (keyCode === 32) {
		console.log(state)

		if(bird && state == states[1]){
			bird.flap();
		}else {
			state = states[1];
			console.log(state)
		}
	}
}

function gameOver() {
	noLoop();
	
	console.log("gameOVer")
	localStorage.setItem('score', score);
	if(write){
		addScore()
	}
	write = false

}

function addScore() {
	db.collection("gameData").add({
		by: userID,
		score: score
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
		window.location.href = "read.html";
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});
}