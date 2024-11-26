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
    let kat = puits.appendChild(document.createElement("p"));
    // puits.appendChild(document.createElement("br"));
    // Remplir le katex
    kat.innerHTML = "Quelle est la fonction affichée ?";

    //on génère le graphe
    let a1 = rnd(11)-5;
    let b1 = rnd(11)-5;
    let f1 = `a1*x+b1`;
    // On génère les valeurs
    let xValues1 = [];""
    let yValues1 = [];
    for (let x = 0; x <= 5; x += 0.1) {
        yValues1.push(eval(f1));
        xValues1.push(x);
    }

    let a2 = rnd(11)-5;
    let b2 = rnd(11)-5;
    let f2 = `a2*x+b2`;
    let xValues2 = [];""
    let yValues2 = [];
    for (let x = 0; x <= 5; x += 0.1) {
        yValues2.push(eval(f2));
        xValues2.push(x);
    }

    let a3 = rnd(11)-5;
    let b3 = rnd(11)-5;
    let f3 = `a3*x+b3`;
    let xValues3 = [];""
    let yValues3 = [];
    for (let x = 0; x <= 5; x += 0.1) {
        yValues3.push(eval(f3));
        xValues3.push(x);
    }

    // Plotly pour afficher la coubre
    let data = [
        {x:xValues1, y:yValues1, mode:"lines"},
        {x:xValues2, y:yValues2, mode:"lines"},
        {x:xValues3, y:yValues3, mode:"lines"}
    ];
    let layout = {title: "y = ax+b" };
    Plotly.newPlot(div, data, layout);

    let inpttext=  puits.appendChild(document.createElement("katex"));
    let inpt = puits.appendChild(document.createElement("input"));
    let inpt2text =  puits.appendChild(document.createElement("katex"));
    let inpt2 = puits.appendChild(document.createElement("input"));

    inpttext.innerHTML = "1. y= ";

    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inpt.type = "text";
    inpt.id = `input`;
    inpt.class = "answers";
    asw[0] = a1;

    inpt2text.innerHTML = "x+";

    inpt2.type = "text";
    inpt2.id = `input`;
    inpt2.class = "answers";
    // Mettre la réponse dans la liste 
    asw[1] = b1;
    
    // Render les maths
    render_katex();
}

function score() {

    let score = 0;
    // Récupérer l'élément avec pr id 'input0', 'input1'...
    let inpt = document.getElementById(`input`);
    // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
    if (inpt.value == asw[0]) {
        score++;
    }

    let inpt2 = document.getElementById(`input`);
    if (inpt2.value == asw[1]) {
        score++;
    }
    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 1) {
        scdiv.innerHTML = " Bravo! Vous êtes le meilleur !";
        scdiv.className = "vgood"
    }
    else {
        scdiv.innerHTML = " Sérieusement... c'est niveau 4eme....";
        scdiv.className = "vbad";
    }

}


document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        score();
    }
});
