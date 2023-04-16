let games = ["flappy.html", "random.html","dino.html"]
let randomI;

randomI = Math.floor(Math.random()*games.length);
console.log(randomI);
window.location.href = games[randomI];
