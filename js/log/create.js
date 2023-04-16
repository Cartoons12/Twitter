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
		window.location.href = "index.html";
	});

	createBtn.addEventListener("click",(event)=>{
		event.preventDefault();
		createAccount(nameBox.value, passBox.value);
	})
}


function createAccount(username, password) {
	if(username && password){
			db.collection("users").add({
	    username: username,
	    password: password,
	    friends: [],
	    rating: 0,
		})
		.then((docRef) => {
			localStorage.setItem('username', username);
			localStorage.setItem('userID', docRef.id);
			window.location.href = 'home.html';
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
		    console.error("Error adding document: ", error);
			errorH.innerHTML = error
		});
	}

}