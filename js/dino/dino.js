let trex;
let tree;
let score = 0;
let write = true;
let state;
let dinoImg;
let treeImg;
let backImg;
let foreImg;

function preload() {
	dinoImg = loadImage("https://i.ibb.co/Jj7GxRx/R.png");
	treeImg = loadImage("https://i.ibb.co/JFFkVQG/R-1.png");
	backImg = loadImage("https://i.ibb.co/NrPXHdN/Untitled.png");
	foreImg = loadImage("https://i.ibb.co/0QdL1jY/Untitled2.png");
}

function setup() {
	console.log("hello");

	createCanvas(800,400);
	trex = new Trex();
	tree = new Grass();
	state = 0;
}

function draw() {
	background(77,225,255);
	image(foreImg, 0,0, 800, 400)
	if(keyIsDown(32)) {
		if(state == 1){
			trex.jump();
		}else {
			state = 1;
		}
	}

	if(state == 1) {
		if(trex.collide(tree)) {
			gameOver();
		}

		if(trex.x == tree.x) {
			score++;
		}

		fill(0);
		textSize(50);
		text(score,width/2,50)

		tree.update();
		trex.update();

		tree.draw();
		trex.draw();

		fill(230,153,0);
		noStroke();
		image(backImg,0,height-40,width,45)

	}else{

		tree.draw();
		trex.draw();

		fill(230,153,0);
		noStroke();
		image(backImg,0,height-40,width,45)

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