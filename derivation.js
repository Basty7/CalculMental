// init: ajout éléments
const insertingContainer = document.getElementById('inserting');
const childContainerDiv = insertingContainer.appendChild(document.createElement("div"));
const katexConsigne = childContainerDiv.appendChild(document.createElement("katex"));
const katexReponse = childContainerDiv.appendChild(document.createElement("katex"));
// const inputField = childContainerDiv.appendChild(document.createElement("input"));

// Classes
katexConsigne.classList.add("katex-question");
childContainerDiv.classList.add("question-answer");
katexReponse.classList.add("katex-question")
// inputField.classList.add("answers")

let Reponse;

let type = 0;
let choix;

function generer() {
	choix = rnd(3);
	katexReponse.innerHTML = "";
	let px = new Polynome(5)
	for (let k = 0; k<= 5; k++) {
		px.setcoeff(k, rnd(8) +1)
	}
	switch (choix) {
		case 0:
			// sqrt(ax+b)
			katexConsigne.innerText = `\\frac{d}{dx}\\sqrt{${px.toString()}} \\Large =`;
			Reponse = px;
			break;
		case 1:
			// ln(ax+b)
			katexConsigne.innerText = `\\frac{d}{dx}\\ln({${px.toString()}})\\Large =`;
			Reponse = px;
			break;
		case 2:
			// e^(ax +b)
			katexConsigne.innerText = `\\frac{d}{dx}e^{${px.toString()}}\\Large =`;
			Reponse = px;
			break;
		default:
			break;
	}
	render_katex();
}

//rajoute une racine
// function racine() {
// 	inputField.value += ` \\sqrt{}`;
// 	katexReponse.innerHTML = inputField.value;
// 	render_katex_in_element(katexReponse);
// }
// //rajoute une fraction
// function frac() {
// 	inputField.value += ` \\frac{}{}`;
// 	katexReponse.innerHTML = inputField.value;
// 	render_katex_in_element(katexReponse);
// }

// //rajoute une exponentielle
// function expo() {
// 	inputField.value += `\e^{}`;
// 	katexReponse.innterHTML = inputField.value;
// 	render_katex_in_element(katexReponse);
// }
//pour afficher le latex
// function latex() {
// 	katexReponse.innerHTML = inputField.value;
// 	render_katex_in_element(katexReponse);
// }

function solution() {
	switch (choix) {
		case 0:
			katexReponse.innerText = `\\frac {${Reponse.derive().multiplie(0.5).toString()}}{\\sqrt{${Reponse.toString()}}}`;
			render_katex_in_element(katexReponse);
			break;
		case 1:
			katexReponse.innerText = `\\frac {${Reponse.derive().toString()}}{${Reponse.toString()}}`;
			render_katex_in_element(katexReponse);
			break;
		case 2:
			katexReponse.innerText = `(${Reponse.derive().toString()})e^{${Reponse.toString()}}`;
			render_katex_in_element(katexReponse);
			break;

		default:
			break;
	}
}


// function score() {

// 	let score = 0;
// 	let right;
// 	switch (choix) {
// 		case 0:
// 			// expect -1/2sqrt(p)
// 			console.log("check sqrt'");

// 			try {
// 				if (Number(inputField.value.split('/')[0]) != -1) {
// 					right = false;
// 					break;
// 				}

// 			} catch (error) {
// 				right = false;
// 			}
// 			if (Reponse.multiplie(2).equals(new Polynome(inputField.value.split('/')[1]))) {
// 				right = true;
// 			}
// 			else {
// 				right = false;
// 			}
// 			break;
// 		case 1:
// 			console.log("check ln'");
// 			try {
// 				if (new Number(inputField.value.split('/')[0]) != 1) {
// 					right = false;
// 					break;
// 				}

// 			} catch (error) {
// 				right = false;
// 			}
// 			if (Reponse.equals(new Polynome(inputField.value.split('/')[1]))) {
// 				right = true;
// 			}
// 			else {
// 				right = false;
// 			}
// 			break

// 		// expect 1/P
// 		case 2:
// 			console.log("check e'");
// 			let P = new Polynome(inputField.value.split("e^")[0]);
// 			let Q = new Polynome(inputField.value.split("e^")[1]);
// 			console.log(Reponse.derive().toString());

// 			if (Reponse.derive().equals(P) && Reponse.equals(Q)) {
// 				right = true;
// 			}
// 			else {
// 				right = false;
// 			}
// 			break;
// 		// expect P'e^P

// 	}



// 	// Récupère l'élément destiné à contenir l'affichage du score
// 	let scdiv = document.getElementById('score');
// 	// En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
// 	if (right) {
// 		scdiv.innerHTML += " Bravo!";
// 		scdiv.className = "vgood"
// 	}
// 	else {
// 		scdiv.innerHTML += " Révisez! (ou revoyez votre code...)";
// 		scdiv.className = "vbad";
// 	}

// }



document.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		score();
	}
});

