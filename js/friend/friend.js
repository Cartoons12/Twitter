let nameI;
let contentI;
let addB;
let name, content;
let username = localStorage.getItem("username");
let userID = localStorage.getItem("userID");

if(username && userID) {
	window.onload = ()=>{
		nameI = document.getElementById('fName');
		contentI = document.getElementById('contentI');
		addB = document.getElementById("aBtn");

		addB.addEventListener("click", (event)=>{
			event.preventDefault();
			checkGood(nameI.value)
		})

		findRequest();
	}

	function renderFriend(name, contentSend,id) {
		let requestD = document.createElement("div");
		let titleH = document.createElement("h2");
		let textP = document.createElement("p");
		let rejectBtn = document.createElement("button");
		let acceptBtn = document.createElement("button");

		requestD.className = "request";
		titleH.className = "name";
		textP.className = "text";
		rejectBtn.className = "reject";
		acceptBtn.className = "accept";

		titleH.innerHTML = name;
		textP.innerHTML = contentSend;
		rejectBtn.innerHTML = "REJECT";
		acceptBtn.innerHTML = "ACCEPT";

		acceptBtn.addEventListener("click", (event)=>{
			getFriend(name);
			getOtherFriend(name,username);
			removeRequest(id);
			document.getElementById("requests").removeChild(requestD);
		});

		rejectBtn.addEventListener("click", (event)=>{
			removeRequest(id);
			document.getElementById("requests").removeChild(requestD);
		});

		requestD.appendChild(titleH);
		requestD.appendChild(textP);
		requestD.appendChild(rejectBtn);
		requestD.appendChild(acceptBtn);

		document.getElementById("requests").appendChild(requestD);
	}

	function getOtherFriend(name, username) {
		db.collection("users").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				if(doc.data()["username"] == name) {
					console.log("this far")
					addOtherFriend(doc.id,doc.data()["friends"], username)
				}
			});
		});
	}

	function addOtherFriend(id, friends, me) {
		console.log("old other friends: ",friends)
		console.log("me: ",me)

		let newOtherFriends = friends;
		newOtherFriends.push(me);

		console.log("other new: ",newOtherFriends)
		var friendRef = db.collection('users').doc(id);
		console.log("other data",friendRef);

		var setWithMerge = friendRef.set({
			friends: newOtherFriends
		}, { merge: true });
		console.log(setWithMerge)
	}

	function removeRequest(id) {
		db.collection("friends").doc(id).delete().then(() => {
			console.log("Document successfully deleted!");
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
	}

	function addFriend(friends,friend) {
		console.log("old friends: ",friends)
		console.log("WIll add friend: ",friend)

		let newFriends = friends;
		newFriends.push(friend);

		console.log("new: ",newFriends)
		var friendRef = db.collection('users').doc(userID);

		var setWithMerge = friendRef.set({
			friends: newFriends
		}, { merge: true });
	}

	function getFriend(name) {
		var docRef = db.collection("users").doc(userID);

		docRef.get().then((doc) => {
		if (doc.exists) {
			addFriend(doc.data()["friends"],name)
			console.log("Document data:", doc.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}

	function findName(idFriend, contentSended, id) {
		var docRef = db.collection("users").doc(idFriend);

		docRef.get().then((doc) => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				renderFriend(doc.data()["username"], contentSended, id);
			} else {
				console.log("No such document!");
			}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
	}

	function findRequest() {
		db.collection("friends").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if(doc.data()["to"]==userID) {
					findName(doc.data()["by"], doc.data()["content"], doc.id);
				}
			});
		});
	}

	function reFriend() {
		name = nameI.value;
		content = contentI.value;

		db.collection("users").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(doc.data()["username"] == name) {
				requestFriend(doc.id);
			}
		});
		});
	}

	function checkGood(reName) {
		var docRef = db.collection("users").doc(userID);
		docRef.get().then((doc) => {
		if (doc.exists) {
			console.log("new" + doc.data()["friends"].length);
			for(let i=0;i<doc.data()["friends"].length;i++){
				if(doc.data()["friends"][i] == reName) {
					console.log("Friended");
					return false;
				}
			}

			if(reName !== username) {
				reFriend();
			}else{
				console.log("Error same username")

				return false;
			}
			console.log("Document data:", doc.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}

	function requestFriend(id) {
		db.collection("friends").add({
			by: userID,
			content: content,
			to: id
		})
		.then((docRef) => {

			console.log("Document written with ID: ", docRef.id);
			window.location.href = 'home.html';

		})
		.catch((error) => {
		console.error("Error adding document: ", error);
		});
	}


}else{
	window.location.href = 'index.html';
}