let data;
function select(collect, type, find,work) {
	var docRef = db.collection(collect).get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc)=>{
			if(doc.data()[type]==find){
				work(doc.data());
			}
		})
	}).catch((error) => {
			console.log("Error getting document:", error);
	});
}