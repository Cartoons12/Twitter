let username = localStorage.getItem("username");
let contentTA;
let contentBtn;
let userID;

if (username){
    window.onload = ()=>{
        getUserID();
        contentTA = document.getElementById('text');
        contentBtn = document.getElementById("textBtn");

        contentBtn.addEventListener("click", ()=>{
            if(contentTA.value.replace(/\s/g, '') != ""){
                addPost(contentTA.value);

            }
        });
    }
}else{
   window.location.href = 'index.html';
}

function addPost(text){

    db.collection("posts").add({
        createdBy: userID,
        rating: 0,
        content: text
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = 'home.html';

    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}



function getUserID() {
    db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.data()["username"] == username){
            userID = doc.id;
        }
        console.log(doc.id, " => ", doc.data()["username"]);
        });
    });
}