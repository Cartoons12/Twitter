let friendDs;
let gameA;

function getFriend(){
	friendDs = document.getElementsByClassName('friend');
	gameA = document.getElementById('random');

	gameA.addEventListener("click", (event)=>{
		event.preventDefault();
		localStorage.setItem("friend", "");
		window.location.href = "game.html";	
	});

	for(let i=0; i < friendDs.length; i++) {
		friendDs.item(i).addEventListener("click", (event)=>{
			event.preventDefault();
			localStorage.setItem("friend", friendDs.item(i).innerHTML);
			window.location.href = "game.html";
		});
	}
}
