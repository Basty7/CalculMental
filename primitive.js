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

function generer() {

	let a = 4*(rnd(9)+1);
	let b = 3*(rnd(9)+1);
	let c = 2*rnd(9) +2;
	let d = rnd(9)+1;
	// Remplir le katex
	katexElement.innerHTML = `f'(x) = ${a}x^3 + ${b}x^2 + ${c}x + ${d} ; f(x) = `;
	// Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
	inputField.type = "text";
	inputField.id = `input`;
	inputField.class = "answers";
	// Mettre la réponse dans la liste 
	// la réponse c'est : a/4x^4+b/3x^3+c:2x^2+dx ;
	asw1[0] = a/4;
	asw1[1] = b/3;
	asw1[2] = c/2;
	asw1[3] = d;
	// Render les maths
	render_katex_in_element(katexElement);
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
        //réponse : 
		// Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
	if ( (inputField.value[0] == asw1[0]) && (inputField.value[3] == 4)&& (inputField.value[5] == asw1[1] ) 
		&& (inputField.value[8] == 3) && (inputField.value[10] == asw1[2]) && (inputField.value[13] == 2) 
		&& (inputField.value[15]==asw1[3])) {
		score++;
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

