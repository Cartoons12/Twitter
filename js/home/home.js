let bestD;
let logoutB;
let username = localStorage.getItem("username");
let userID = localStorage.getItem("userID");
let friendsD;
let randomA
let bestList = [];
let bestDict = {};
let bestLength;
let d = new Date();
let lastH, nextH;

if(username && userID){
	window.onload = ()=>{
	bestD = document.getElementById('top10');
	logoutB = document.getElementById("log");
	friendsD = document.getElementById("friends");
	randomA = document.getElementById("random");
	lastH = document.getElementById("last");
	nextH = document.getElementById("next");



	logoutB.addEventListener("click", (event)=>{
		event.preventDefault();
		localStorage.setItem('username', "");
		window.location.href = 'index.html';
	})

	randomA.addEventListener("click", (event)=>{
		localStorage.setItem('friend', "");
	})


	hourUpdate();
	findBest();
	findFriend();
	}

	function hourUpdate() {
		var docRef = db.collection("info").doc("time");

		docRef.get().then((doc) => {
			if (doc.exists) {
				rederHour(doc.data().current)
				console.log("Document data:", doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});


	}

	function rederHour(time) {
		let newTime = time;
		let hours = ""
		for(let i = 0; i < newTime.length; i++) {
			if(newTime[i]==":") {
				break
			}else {
				hours = hours + newTime[i]
			}
		}
		hours = (Number(hours)+1).toString()
		if(Number(hours)<10) {
			hours = "0"+hours
		}
		if(Number(hours)> 23) {
			hours = 0
		}

		newTime = hours

		for(let i=2;i<time.length; i++) {
			newTime = newTime+time[i]
		}
		console.log("time: newTime");
		lastH.innerHTML = "Last Update: " + time;
		nextH.innerHTML = "Next Update: " + newTime;
	}



	function findBest(){
		var docRef = db.collection("leaders").orderBy(firebase.firestore.FieldPath.documentId()).get()
		.then((querySnapshot) => {
			console.log(querySnapshot.docs);
			bestLength = querySnapshot.docs.length
			querySnapshot.docs
			.forEach((doc)=>{
				bestList.push(doc.data()["by"]);
				console.log(doc.data());
				getName(doc.data()["by"], doc.data()["score"]);
			})
		}).catch((error) => {
				console.log("Error getting document:", error);
		});
	}

	function renderAll() {
		for(let i = 0; i < bestList.length; i++) {
			renderBest(bestDict[bestList[i]][0][0], bestDict[bestList[i]][0][1])
		}
	}

	async function getName(id, score) {
		console.log("real id",(id))

		var nameRef = db.collection("users").doc(id);

		nameRef.get().then((doc) => {
		if (doc.exists) {
			bestDict[id] = []
			bestDict[id].push([doc.data()["username"], score])
			// renderBest()
			console.log("Real data:", doc.data());
			if(bestList.length >= bestLength && Object.keys(bestDict).length >= bestLength) {
				renderAll();
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!", id);
		}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}

	function renderBest(username, score) {
		console.log(username);
		let leaderD = document.createElement("div");
		leaderD.id = "leaders";
		let newE = document.createElement("h2");
		let scoreE = document.createElement("h2");

		newE.innerHTML = username;
		scoreE.innerHTML = score;
		
		leaderD.appendChild(newE);
		leaderD.appendChild(scoreE);

		bestD.appendChild(leaderD);
	}

	function findFriend(){
		var docRef = db.collection("users").doc(userID);

		docRef.get().then((doc) => {
		if (doc.exists) {

			renderFriend(doc.data()["friends"])
			console.log("Document data:", doc.data());
		} else {

			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}

	function renderFriend(friends) {
		for(let i=0; i<friends.length; i++){
			let friend = document.createElement("a");
			localStorage.setItem("friend",friends[i]);
			friend.href="game.html";
			friend.className="friend";
			friend.innerHTML = friends[i];
			friendsD.appendChild(friend);
		}
		getFriend()
	}
}	

else{
	window.location.href = 'index.html';
}


