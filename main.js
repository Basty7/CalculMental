function rnd(n) {
	return Math.floor(Math.random() * n);
}

document.getElementById("benge").innerHTML = "Hello, World! \n";
document.getElementById("benge").innerHTML += String(rnd(100));



// document.insertBefore(document.getElementsByTagName("katex")[0], document.createElement("p"));