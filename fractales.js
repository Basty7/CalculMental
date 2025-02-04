let puits = document.getElementById('insertinggraphe');

let asw = [
    0,
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
    let image0 = document.createElement("img");
    kat.innerHTML = `\\text{Quelle est la fractale affichée ?}`;
    let choix = rnd(5);
    if (choix == 0) {
        image0.src = "assets/FloconKoch.jpg";
        asw[0] = 0
    }
    if (choix == 1) {
        image0.src = "assets/Julia.jpg";
        asw[0] = 1
    }
    if (choix == 2) {
        image0.src = "assets/mandelbrot.jpg";
        asw[0] = 2
    }
    if (choix == 3) {
        image0.src = "assets/menger.jpg";
        asw[0] = 3
    }
    if (choix == 4) {
        image0.src = "assets/Sierpinski.png";
        asw[0] = 4
    }
    puits.appendChild(image0);
    // Render les maths
    render_katex();


}

let user = 0;

function score0() {
    user = 0;
}
function score1() {
    user = 1;
}
function score2() {
    user = 2;
}
function score3() {
    user = 3;
}
function score4() {
    user = 4;
}

function score() {

    let score = 0;
    // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
    if (user == asw[0]) {
        score++;
    }

    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 1) {
        scdiv.innerHTML += " Bravo!";
        scdiv.className = "vgood"
    }
    else {
        scdiv.innerHTML += " Dommage...";
        scdiv.className = "vbad";
    }

}



document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        score();
    }
});
