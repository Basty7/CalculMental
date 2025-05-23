let insertingDiv = document.getElementById('inserting');

let asw = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
// tableau de réponses

function generer() {
	// Vider la div insertingDiv
	insertingDiv.innerHTML = "";
	// Pour les valeurs de pas dans [0,10[ (10 valeurs)
	for (let pas = 0; pas < 10; pas++) {
		let x = rnd(100);
		let y = rnd(100);
		// Créer un div avec un katex et un input
		// document.createElement(tag) créé un nouvel élément de forme <tag></tag>
		// parent.appendChild(enfant) place l'enfant en dernier élément à l'intérieur du parent (sans ça, l'élément n'est pas placé dans le document, et donc, pas affiché)
		let div = insertingDiv.appendChild(document.createElement("div"));
		let kat = div.appendChild(document.createElement("katex"));
		let inpt = div.appendChild(document.createElement("input"));
		// insertingDiv.appendChild(document.createElement("br"));
		// Remplir le katex
		kat.innerHTML = `${x} + ${y} = `;
		// Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
		inpt.type = "text";
		inpt.id = `input${pas}`;
		inpt.className = "answers";
		kat.className = "katex-question";
		div.className = "question-answer";
		// Mettre la réponse dans la liste 
		asw[pas] = x + y;
		if (pas != 9) {
			inpt.addEventListener('keydown', (event) => {
				if (event.key == 'Enter') {
					event.stopPropagation(); // Empêcher les actions d'autres EventListeners
					right(); // Déplacer le scroll vers la droite (fonction définie plus bas)
					document.getElementById(`input${pas + 1}`).select(); // Déplacer le curseur sur l'input suivant
				}
			})
		}
	}
	// Render les maths
	render_katex();
}


function right() {
	insertingDiv.parentElement.scrollLeft += window.innerWidth;
	// insertingDiv.scrollLeft += 100;
}

function left() {
	insertingDiv.parentElement.scrollLeft -= window.innerWidth;
	// insertingDiv.scrollLeft -= 100;
}


function score() {
	let score = 0;
	for (let pas = 0; pas < 10; pas++) {
		// Récupérer l'élément avec pr id 'input0', 'input1'...
		let inputField = document.getElementById(`input${pas}`);
		// Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
		if (inputField.value == asw[pas]) {
			score++;
		}
	}
	// Récupère l'élément destiné à contenir l'affichage du score
	let scoreDiv = document.getElementById('score');
	// Changer son texte pour afficher le score obtenu
	scoreDiv.innerHTML = `Votre score est de ${score}/10`;
	// En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
	if (score == 10) {
		scoreDiv.innerHTML = " Bravo!";
		scoreDiv.className = "vgood"
	}
	else if (score <= 1) {
		scoreDiv.innerHTML = " Révisez!";
		scoreDiv.className = "vbad";
	}
	else if (score < 5) {
		scoreDiv.innerHTML = " Vous pouvez faire mieux!";
		scoreDiv.className = "bad";
	}
	else {
		scoreDiv.innerHTML = " Pas mal!";
		scoreDiv.className = "good";
	}

}




document.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		score();
	}
});


