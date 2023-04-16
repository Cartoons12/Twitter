let chosing = true
let username = localStorage.getItem("username");
let score = localStorage.getItem("score");
let contentP, ratingP, userP, upBtn, downBtn;
let gRated = false;
let bRated = false;
let createdBy;
let newRate = 0;
let friend = localStorage.getItem("friend");
let friendID;
let index = 0;
let maxIndex = 0;
let leftD;
let friendChecking = true;

if (username){
	if(score){
		contentP = document.getElementById('content');
		ratingP = document.getElementById('voting');
		userP = document.getElementById('username');
		leftD = document.getElementById('left');
		upBtn = document.getElementById('up');
		downBtn = document.getElementById('down');
		leftD.classList.add("no");

		if(friend) {
			friendId();
		}else{
			randomTweet()
		}

	}else{
   	window.location.href = 'random.html';
	}
}else{
   window.location.href = 'index.html';
}

function checkBug() {
	db.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    		if(doc.data()["createdBy"] == friendID && doc.data()["rating"] < score && friendChecking) {
    			randomTweet();
    			friendChecking = false;
    		}
   	});
   if(friendChecking) {
		contentP.innerHTML = "Bug because your friend have no post or because you have too low score! (This tweet is hard coded)";
   }
	});
}


function friendId() {
	db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        if(doc.data()["username"] == friend) {
        		friendID = doc.id;
        		checkBug()
        }
    	});
	});
}

function randomTweet() {
	var docRef = db.collection("posts").get()
	.then((querySnapshot) => {
		maxIndex = querySnapshot.docs.length;
		querySnapshot.docs.reverse();
		while (chosing){
			index++;
			querySnapshot.forEach((doc)=>{

			console.log(doc.data().content);
			console.log(doc.data().rating);
			console.log(doc.data().createdBy);
			if((doc.data().rating<score && Math.random()>0.5 || index >= maxIndex) && chosing){
				chosing = false;
				getWriter(doc.data()["createdBy"]);
				console.log("getting writer:" ,doc.data()["createdBy"])
				contentP.innerHTML = doc.data().content;
				ratingP.innerHTML = doc.data().rating;
				rate(doc.id, doc.data().rating);
				console.log("chosing", chosing)
 				return;
			}
			console.log("still ", chosing)
			})
		}

	}).catch((error) => {
			console.log("Error getting document:", error);
	});
}


function show() {
	leftD.classList.remove("no");
}

function rate(id, rating) {
	upBtn.addEventListener("click", (event)=>{
		newRate = rating;
		console.log(gRated)
		if(gRated == false){
			console.log(gRated)
			gRated = true;
			newRate = rating;
			console.log("gRate")
			newRate++;
			upBtn.classList.add("voted");
			downBtn.classList.remove("voted");
			ratingP.innerHTML = newRate;
			bRated = false;
			db.collection("posts").doc(id).set({
				rating: newRate
			}, { merge: true })
			.then(() => {
			    console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing xdocument: ", error);
			});
		}else if(gRated == true){
			console.log("ungRate")
			console.log(gRated)
			gRated = false;

			newRate = rating;

			upBtn.classList.remove("voted");
			ratingP.innerHTML = newRate;
			bRated = false;
			db.collection("posts").doc(id).set({
				rating: newRate
			}, { merge: true })
			.then(() => {
			    console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing document: ", error);
			});
		}
	})

	downBtn.addEventListener("click", (event)=>{
		if(bRated == false){
			newRate = rating;
			console.log("bRate")

			downBtn.classList.add("voted");
			upBtn.classList.remove("voted");

			newRate--;
			ratingP.innerHTML = newRate
			gRated = false;
			bRated = true;
			console.log(newRate);
			db.collection("posts").doc(id).set({
				rating: newRate
			}, { merge: true })
			.then((ref) => {
				console.log(newRate);
			   console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing document: ", error);
			});
		}else if(bRated == true){
			console.log("unbRate")

			newRate = rating;

			upBtn.classList.remove("voted");
			downBtn.classList.remove("voted");
			ratingP.innerHTML = newRate;
			gRated = false;
			bRated = false;

			console.log(newRate);
			db.collection("posts").doc(id).set({
				rating: newRate
			}, { merge: true })
			.then((ref) => {
				console.log(newRate)
			   console.log("Document successfully written!");
			})
			.catch((error) => {
			    console.error("Error writing document: ", error);
			});
		}
	})


}

function getWriter(id) {
	console.log(id)
	db.collection("users").doc(id).get()
	.then((doc) => {
	if (doc.exists) {
		createdBy = doc.data()["username"];
		console.log(createdBy);
		console.log("Document data:", doc.data());
		if(friend) {
			console.log("hello")

			if(createdBy == friend) {
				show();
				userP.innerHTML = "By: " + createdBy;
			}else {
				window.location.reload();
			}
		}else {
			userP.innerHTML = "By: " + createdBy;
			show();
		}
	} else {
		console.log("No such document!");
	}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});

}