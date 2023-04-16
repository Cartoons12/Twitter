let checkable;
let passBox, nameBox, submitBtn, createBtn,errorH;


window.onload = ()=>{
	errorH = document.getElementById("errorH")
	passBox = document.getElementById("passBox")
	nameBox = document.getElementById("nameBox")
	submitBtn = document.getElementById("submitBtn")
	createBtn = document.getElementById("createBtn")

	submitBtn.addEventListener("click",(event)=>{
		event.preventDefault();
		checkLog(nameBox.value, passBox.value);
	});

	createBtn.addEventListener("click",(event)=>{
		event.preventDefault();
		window.location.href = "create.html";
	})
}

function checkLog(username, password) {
	checkable = true;
	var docRef = db.collection("users").get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc)=>{
			console.log(doc.data().password)
			console.log(doc.data().username)
			if(doc.data().username == username && doc.data().password == password){
				console.log("Right Account");
				localStorage.setItem('username', username);
				localStorage.setItem('userID', doc.id);
				window.location.href = 'home.html';
				checkable = false;
			}
			console.log("Wrong Account");
		})
		if(checkable){
			console.log("Stop Hacker");
			errorH.innerHTML = "WRONG username or pass"

		}
	}).catch((error) => {
			console.log("Error getting document:", error);
	});
}
