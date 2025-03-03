let insertingContainer = document.getElementById('inserting');
let childContainerDiv = insertingContainer.appendChild(document.createElement("div"));
let katexElement = childContainerDiv.appendChild(document.createElement("katex"));
let katexElRep = childContainerDiv.appendChild(document.createElement("katex"));
let inputField = childContainerDiv.appendChild(document.createElement("input"));

let asw1 = [
	0, 0, 0, 0, 0
];

let asw2 = [
	0, 0, 0, 0, 0
];

let type = 0;

function generer() {
	let choix = rnd(3);
	if (choix == 0) {
		let a = 2 * rnd(5) + 1;
		let b = rnd(10);
		// Remplir le katex
		katexElement.innerHTML = `f(x) = \\sqrt\{${a} x + ${b}\} ; f'(x) = `;
		// Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
		inputField.type = "text";
		inputField.id = `input`;
		inputField.class = "answers";
		// Mettre la réponse dans la liste 
		// la réponse c'est : \frac{a}{2\sqrt{ax+b}};
		asw1[0] = a;
		asw2[0] = b;
		type = 0;
		// Render les maths
		render_katex();
	}
	if (choix == 1) {
		let a = rnd(8) + 1;
		let b = 11-a;
		katexElement.innerHTML = `f(x) = \\ln(${a}x+${b}) ; f'(x) = `;
		inputField.type = "text";
		inputField.id = `input`;
		inputField.class = "answers";
		//la réponse c'est : \frac{a}{ax+b};
		asw1[0] = a;
		asw2[0] = b;
		type = 1;
		render_katex();
	}
	if (choix == 2) {
		
		let a = rnd(9)+1;
		let b = rnd(9)+1;
		let d = rnd(9)+1;
		katexElement.innerHTML = `f(x) =  e^{(${a}x+${b})} + ${d} ; f'(x) = `;
		inputField.type = "text";
		inputField.id = `input`;
		inputField.class = "answers";
		//la réponse c'est : ae^(ax+b);
		asw1[0]=a;
		asw2[0] = b;
		type = 2;
		render_katex();
	}
}

//rajoute une racine
function racine() {
	inputField.value += ` \\sqrt{}`;
	katexElRep.innerHTML = inputField.value;
	render_katex_in_element(katexElRep);
}
//rajoute une fraction
function frac() {
	inputField.value += ` \\frac{}{}`;
	katexElRep.innerHTML = inputField.value;
	render_katex_in_element(katexElRep);
}

//rajoute une exponentielle
function expo() {
	inputField.value += `\e^{}`;
	katexElRep.innterHTML = inputField.value;
	render_katex_in_element(katexElRep);
}
//pour afficher le latex
function latex() {
	katexElRep.innerHTML = inputField.value;
	render_katex_in_element(katexElRep);
}

function score() {

	let score = 0;

	let inputField = document.getElementById(`input`);
	// Récupérer l'élément avec pr id 'input0', 'input1'...
	if (type == 0) {
		let el2 = inputField.value[6];
		let el3 = inputField.value[9];
		let el4 = inputField.value[16];
		let el5 = inputField.value[17];
		let el6 = inputField.value[18];
		let el7 = inputField.value[19];
		// Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
		if ( (el2 == asw1[0]) && (el3 == "2") && (el4 == asw1[0]) && (el5 == "x") && (el6 == "+") && (el7 == asw2[0])) {
			score++;
		}

	}
	if(type == 1) {
		//la réponse c'est : \frac{a}{ax+b};
		let el1 = inputField.value[1];
		let el2 = inputField.value[6];
		let el3 = inputField.value[9];
		let el4 = inputField.value[10];
		let el5 = inputField.value[12];

		if ( (el1 == "f") && (el2 == asw1[0] ) && (el3 == asw1[0]) && ( el4 == "x") && (el5 == asw2[0])){
			score++;
		}
	}
	if (type == 2) {
		// réponse : ae^(ax+b)
		let el1 = inputField.value[0];
		let el2 = inputField.value[1];
		let el3 = inputField.value[4];
		let el4 = inputField.value[5];
		let el5 = inputField.value[7];
		if ( (el1 == asw1[0]) && (el2 == "e") && (el3 == asw1[0]) && (el4 == "x") && (el5 == asw2[0]) ) {
			score++;
		}

	}
	// Récupère l'élément destiné à contenir l'affichage du score
	let scdiv = document.getElementById('score');
	// En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
	if (score == 1) {
		scdiv.innerHTML = " Bravo!";
		scdiv.className = "vgood"
	}
	else if (score == 0) {
		scdiv.innerHTML = " Révisez! (ou revoyez votre code...)";
		scdiv.className = "vbad";
	}

}



document.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		score();
	}
});

