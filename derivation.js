// init: ajout éléments
const insertingContainer = document.getElementById('inserting');
const childContainerDiv = insertingContainer.appendChild(document.createElement("div"));
const katexConsigne = childContainerDiv.appendChild(document.createElement("katex"));
const katexReponse = childContainerDiv.appendChild(document.createElement("katex"));
const inputField = childContainerDiv.appendChild(document.createElement("input"));

let asw1 = new Array;

let type = 0;

function generer() {
	let choix = rnd(3);
	switch (choix) {
		case 0:
			// sqrt(ax+b)
			let px = new Polynome(1);
			console.log(px);
			px.setcoeff(1, (rnd(4) + 1) * 2);
			px.setcoeff(0, (rnd(4) + 1) * 2);
			console.log(px);
			katexConsigne.innerText = `\\sqrt{${px.toString()}}`;
			asw1.push(px);

			break;
		case 1:
			// ln(ax+b)
			px = new Polynome(1);
			px.setcoeff(1, (rnd(4) + 1) * 2);
			px.setcoeff(0, (rnd(4) + 1) * 2);

			katexConsigne.innerText = `\\ln({${px.toString()}})`;

			asw1.push(px)
			break
		case 2:
			px = new Polynome(1);
			px.setcoeff(1, (rnd(4) + 1) * 2);
			px.setcoeff(0, (rnd(4) + 1) * 2);

			katexConsigne.innerText = `e^{${px.toString()}}`;
			// e^(ax +b)

			break;

		default:
			break;
	}
	render_katex();
}

//rajoute une racine
function racine() {
	inputField.value += ` \\sqrt{}`;
	katexReponse.innerHTML = inputField.value;
	render_katex_in_element(katexReponse);
}
//rajoute une fraction
function frac() {
	inputField.value += ` \\frac{}{}`;
	katexReponse.innerHTML = inputField.value;
	render_katex_in_element(katexReponse);
}

//rajoute une exponentielle
function expo() {
	inputField.value += `\e^{}`;
	katexReponse.innterHTML = inputField.value;
	render_katex_in_element(katexReponse);
}
//pour afficher le latex
function latex() {
	katexReponse.innerHTML = inputField.value;
	render_katex_in_element(katexReponse);
}

function score() {

	let score = 0;

	let inputField = document.getElementById(`input`);
	// Récupérer l'élément avec pr id 'input0', 'input1'...

	

	// if (type == 0) {
	// 	let el1 = inputField.value[0];
	// 	let el2 = inputField.value[7];
	// 	let el3 = inputField.value[10];
	// 	let el4 = inputField.value[17];
	// 	let el5 = inputField.value[18];
	// 	let el6 = inputField.value[19];
	// 	let el7 = inputField.value[20];
	// 	// Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
	// 	if ((el2 == asw1[0]) && (el3 == "2") && (el4 == asw1[0]) && (el5 == "x") && (el6 == "+") && (el7 == asw2[0])) {
	// 		score++;
	// 	}

	// }
	// if (type == 1) {
	// 	//la réponse c'est : \frac{a}{ax+b};
	// 	let el1 = inputField.value[1];
	// 	let el2 = inputField.value[6];
	// 	let el3 = inputField.value[9];
	// 	let el4 = inputField.value[10];
	// 	let el5 = inputField.value[12];

	// 	if ((el1 == "f") && (el2 == asw1[0]) && (el3 == asw1[0]) && (el4 == "x") && (el5 == asw2[0])) {
	// 		score++;
	// 	}
	// }
	// if (type == 2) {
	// 	// réponse : ae^(ax+b)
	// 	let el1 = inputField.value[0];
	// 	let el2 = inputField.value[1];
	// 	let el3 = inputField.value[4];
	// 	let el4 = inputField.value[5];
	// 	let el5 = inputField.value[7];
	// 	if ((el1 == asw1[0]) && (el2 == "e") && (el3 == asw1[0]) && (el4 == "x") && (el5 == asw2[0])) {
	// 		score++;
	// 	}

	// }



	// Récupère l'élément destiné à contenir l'affichage du score
	let scdiv = document.getElementById('score');
	// En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
	if (score == 1) {
		scdiv.innerHTML += " Bravo!";
		scdiv.className = "vgood"
	}
	else if (score == 0) {
		scdiv.innerHTML += " Révisez! (ou revoyez votre code...)";
		scdiv.className = "vbad";
	}

}



document.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		score();
	}
});
