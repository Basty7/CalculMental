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
		let a = rnd(10);
		let b = rnd(10);
        let c = rnd(10) ;
        let d = rnd(10);
		// Remplir le katex
		katexElement.innerHTML = `f(x) = ax^3 + bx^2 + cx + d ; f'(x) = `;
		// Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
		inputField.type = "text";
		inputField.id = `input`;
		inputField.class = "answers";
		// Mettre la réponse dans la liste 
		// la réponse c'est : -\frac{a}{2\sqrt{ax+b}};
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
		
		let a = rnd(10);
		let b = rnd(10);
		let d = rnd(10);
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
        //réponse : 
		// Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
		if () {
			score++;
		}

	}
	if(type == 1) {
		//la réponse c'est : 

		if ( ){
			score++;
		}
	}
	if (type == 2) {
		// réponse : 
		if ( ) {
			score++;
		}

	}
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

