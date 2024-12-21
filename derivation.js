let insertingContainer = document.getElementById('inserting');
let childContainerDiv = insertingContainer.appendChild(document.createElement("div"));
let katexElement = childContainerDiv.appendChild(document.createElement("katex"));
let inputField = childContainerDiv.appendChild(document.createElement("input"));

let asw1 = [
    0, 0, 0, 0, 0
];

let asw2 = [
    0, 0, 0, 0, 0
];

let order = [
    0, 0, 0, 0, 0
]

function generer() {
    // Vider la div puits
    insertingContainer.innerHTML = "";
    let a = rnd(10);
    let b = rnd(10);
    // Remplir le katex
    katexElement.innerHTML = `\\sqrt\{${a} x + ${b}\}`;
    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inputField.type = "text";
    inputField.id = `input`;
    inputField.class = "answers";
    // Mettre la réponse dans la liste 
    // la réponse c'est : -\frac{a}{2\sqrt{ax+b}};
    asw1[0] = a;
    asw2[0] = b;
    
    // Render les maths
    render_katex();
}

//rajoute une racine
function racine(){
    inputField.value += ` \\sqrt{}`;
    katexElement.innerHTML = inputField.value;
    render_katex();
    if (order[0] == 0) {
        order[0] = 1;
    }
    else {
        order[0] = 0;
    }
}
//rajoute une fraction
function frac(){
    inputField.value += ` \\frac{}{}`;
    katexElement.innerHTML = inputField.value;
    render_katex();
    if (order[0] == 1){
        order[0] = 2;
    }
    else {
        order[0] = 0;
    }
} 


function score() {

    let score = 0;
    
    // Récupérer l'élément avec pr id 'input0', 'input1'...
    let inputField = document.getElementById(`input`);
    let el1 = inputField.value[0];
    let el2 = inputField.value[7];
    let el3 = inputField.value[11];
    let el4 = inputField.value[17];
    let el5 = inputField.value[18];
    let el6 = inputField.value[19];
    let el7 = inputField.value[20];
    // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
    if ( (el1 == "-") && (el2 == asw1[0]) && (el3 == "2") && (el4 == asw1[0]) && (el5 == x) && (el6 == "+") && (el7 == asw2[0])) {
        score++;
    }
    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // Changer son texte pour afficher le score obtenu
    scdiv.innerHTML = `Votre score est de ${score}/10`;
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 5) {
        scdiv.innerHTML += " Bravo!";
        scdiv.className = "vgood"
    }
    else if (score <= 1) {
        scdiv.innerHTML += " Révisez!";
        scdiv.className = "vbad";
    }
    else if (score < 4) {
        scdiv.innerHTML += " Vous pouvez faire mieux!";
        scdiv.className = "bad";
    }
    else {
        scdiv.innerHTML += " Pas mal!";
        scdiv.className = "good";
    }

}



document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        score();
    }
});

