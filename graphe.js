let puits = document.getElementById('inserting');

let asw = [
    0, 0
];

function generer() {
    // Vider la div puits
    puits.innerHTML = "";
    // Créer un div avec un katex et un input
    // document.createElement(tag) créé un nouvel élément de forme <tag></tag>
    // parent.appendChild(enfant) place l'enfant en dernier élément à l'intérieur du parent (sans ça, l'élément n'est pas placé dans le document, et donc, pas affiché)
    let div = puits.appendChild(document.createElement("div"));
    let kat = div.appendChild(document.createElement("katex"));
    // puits.appendChild(document.createElement("br"));
    // Remplir le katex
    kat.innerHTML = "Quelle est la fonction affichée ?";
    let a = rnd(11)-5;
    let b = rnd(11)-5;
    let f = `a*x+b`;
    // On génère les valeurs
    const xValues = [];
    const yValues = [];
    for (let x = 0; x <= 10; x += 0.1) {
        yValues.push(eval(f));
        xValues.push(x);
    }

    // Plotly pour afficher la coubre
    const data = [{x:xValues, y:yValues, mode:"lines"}];
    const layout = {title: "y = " + f};
    Plotly.newPlot(div, data, layout);

    let inpt = div.appendChild(document.createElement("input"));
    let inpt2 = div.appendChild(document.createElement("input"));

    
    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inpt.type = "text";
    inpt.id = `input${pas}`;
    inpt.class = "answers";
    asw[0] = a;

    inpt2.type = "text";
    inpt2.id = `input${pas}`;
    inpt2.class = "answers";
    // Mettre la réponse dans la liste 
    asw[1] = b;
    
    // Render les maths
    render_katex();
}

function score() {

    let score = 0;
    // Récupérer l'élément avec pr id 'input0', 'input1'...
    let inpt = document.getElementById(`input${pas}`);
    // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
    if (inpt.value == asw[0]) {
        score++;
    }

    let inpt2 = document.getElementById(`input${pas}`);
    if (inpt2.value == asw[1]) {
        score++;
    }
    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // Changer son texte pour afficher le score obtenu
    scdiv.innerHTML = `Votre score est de ${score}`;
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 1) {
        scdiv.innerHTML += " Bravo!";
        scdiv.className = "vgood"
    }
    else {
        scdiv.innerHTML += " Sérieusement...";
        scdiv.className = "vbad";
    }

}


document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        score();
    }
});
