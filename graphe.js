let puits = document.getElementById('inserting');

let asw = [
    0, 0, 0
];

let ASW = [
    0, 0, 0
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
    kat.innerHTML = "Quelles sont les fonctions affichées ?";

    // https://www.w3schools.com/ai/ai_plotly.asp le site sur lequel le code pour afficher des graphes a été trouvé
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


//trace 0
    let inpttext0=  puits.appendChild(document.createElement("katex"));
    let inpt0 = puits.appendChild(document.createElement("input"));
    let inpt2text0 =  puits.appendChild(document.createElement("katex"));
    let inpt20 = puits.appendChild(document.createElement("input"));

    inpttext0.innerHTML = "0. y= ";

    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inpt0.type = "text";
    inpt0.id = `input0`;
    inpt0.class = "answers";
    asw[0] = a1;

    inpt2text0.innerHTML = "x+";

    inpt20.type = "text";
    inpt20.id = `inputy0`;
    inpt20.class = "answers";
    // Mettre la réponse dans la liste 
    ASW[0] = b1;


//trace 1
    let espace1 = puits.appendChild(document.createElement("br"));
    let inpttext1=  puits.appendChild(document.createElement("katex"));
    let inpt1 = puits.appendChild(document.createElement("input"));
    let inpt2text1 =  puits.appendChild(document.createElement("katex"));
    let inpt21 = puits.appendChild(document.createElement("input"));

    inpttext1.innerHTML = "1. y= ";

    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inpt1.type = "text";
    inpt1.id = `input1`;
    inpt1.class = "answers";
    asw[1] = a2;

    inpt2text1.innerHTML = "x+";

    inpt21.type = "text";
    inpt21.id = `inputy1`;
    inpt21.class = "answers";
    // Mettre la réponse dans la liste 
    ASW[1] = b2;


//trace 2
    let espace2 = puits.appendChild(document.createElement("br"));
    let inpttext2=  puits.appendChild(document.createElement("katex"));
    let inpt2 = puits.appendChild(document.createElement("input"));
    let inpt2text2 =  puits.appendChild(document.createElement("katex"));
    let inpt22 = puits.appendChild(document.createElement("input"));

    inpttext2.innerHTML = "2. y= ";

    // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css).
    inpt2.type = "text";
    inpt2.id = `input2`;
    inpt2.class = "answers";
    asw[2] = a3;

    inpt2text2.innerHTML = "x+";

    inpt22.type = "text";
    inpt22.id = `inputy2`;
    inpt22.class = "answers";
    // Mettre la réponse dans la liste 
    ASW[2] = b3;
    
    // Render les maths
    render_katex();
}

function score() {

    let score = 0;
    for (let pas = 0; pas < 3; pas++) {
        // Récupérer l'élément avec pr id 'input0', 'input1'...
        let inpt = document.getElementById(`input${pas}`);
        let inpt2 = document.getElementById(`inputy${pas}`);
        // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
        if ( (inpt.value == asw[pas]) && (inpt2.value == ASW[pas]) ) {
            score++;
        }
    }
    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // Changer son texte pour afficher le score obtenu
    scdiv.innerHTML = `Votre score est de ${score}/3`;
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 3) {
        scdiv.innerHTML += " Bravo!";
        scdiv.className = "vgood"
    }
    else if (score == 0) {
        scdiv.innerHTML += " Révisez!";
        scdiv.className = "vbad";
    }
    else if (score == 1) {
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
