let questH, answersBtn;
let answers = [];
let index=0;
let correctIndex;
let score = 0;
let QButton;
let scoreH;

window.onload = ()=>{
	questH = document.getElementById("question");
	scoreH = document.getElementById("score");
	play()
}

function play() {
	let fetchRes = fetch("https://the-trivia-api.com/api/questions?limit=20&difficulty=medium")
	.then(res =>res.json()).then(quests => {
		console.log(quests)
		showQuiz(quests);
	});
}



function showQuiz(quests) {
	for(i=0; i<answers.length;i++){
		console.log(answersBtn);
		if(index>0){
			console.log("remove",answersBtn[i]);
			answersBtn[i].remove();
		}
	}
	answersBtn = ["","","",""];
	answers = quests[index].incorrectAnswers



	questH.innerHTML = quests[index].question;
	console.log(answers);
	correctIndex = Math.floor(Math.random()*answers.length);
	answers.splice(correctIndex,0,quests[index].correctAnswer);

	console.log(answers);
	console.log(correctIndex);


	for(i=0; i<answers.length;i++){
		QButton = document.createElement("button");
		QButton.innerHTML = "Hello";
		console.log(QButton);

		document.getElementById('answer').appendChild(QButton);
		answersBtn[i] = QButton
	}
	renderButton(answers, correctIndex, quests)
}

function renderButton(answers, correctIndex, quests) {
	for(i=0; i<answers.length;i++){
		console.log(answersBtn[i])
		console.log("i",answers.length)
		answersBtn[i].innerHTML = answers[i];
		console.log(answers[i]);
		if(i==correctIndex) {
			scoreH.innerHTML = score;
			answersBtn[i].addEventListener("click",(event)=>{
				index++;
				score++;
				if(index >= quests.length){
					localStorage.setItem("score",score);
					window.location.href = "read.html";
				}
				showQuiz(quests);
			})
		}else{
			console.log(i);
			console.log(correctIndex);

			answersBtn[i].addEventListener("click",(event)=>{
				console.log(i);
				console.log(correctIndex)
				localStorage.setItem("score",score);
				addScore()
			})
		}
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

}
