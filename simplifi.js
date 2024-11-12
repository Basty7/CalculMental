let puits = document.getElementById('inserting');

let asw1 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

let asw2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];


function generer() {
    // Vider la div puits
    puits.innerHTML = "";
    // Pour les valeurs de pas dans [0,10[ (10 valeurs)
    for (let pas = 0; pas < 10; pas++) {
        
        // Créer un div avec un katex et un input
        // document.createElement(tag) créé un nouvel élément de forme <tag></tag>
        // parent.appendChild(enfant) place l'enfant en dernier élément à l'intérieur du parent (sans ça, l'élément n'est pas placé dans le document, et donc, pas affiché)
        let div = puits.appendChild(document.createElement("div"));
        let kat = div.appendChild(document.createElement("katex"));
        let inpt = div.appendChild(document.createElement("input"));
        let kat2 = div.appendChild(document.createElement("katex"));
        let inpt2 = div.appendChild(document.createElement("input"));
        // puits.appendChild(document.createElement("br"));
        let type = rnd(2);
        if (type == 0) {

            let fx = rnd(10);
            let x= (fx+1)**2 + rnd(2*fx)+1; // x est squarefree, i. e. n'a pas de diviseur qui est le carré d'un entier > 1
            let y=rnd(1)+1;
            let z=rnd(9)+1; // on les prend pas trop grand pour que ce soit faisable
            let t= x*(z**(2*y)); // l'expression à simplifier
            // Remplir le katex
            kat.innerHTML = `\\sqrt \{${t}\} \\Large =`;
            kat2.innerHTML = `\\sqrt{}`;
            // Mettre le type du input à 'text' son id en fonction de son numéro et sa classe (pour le css);
            inpt.type = "text";
            inpt.id = `input${pas}`;
            inpt.class = "answers";
            // Mettre une deuxième zone pour le texte
            inpt2.type = "text";
            inpt2.id = `inputy${pas}`;
            inpt2.class = "answers";
            // Mettre la réponse dans la liste 
            asw1[pas] = z**y;
            asw2[pas] = x;

        }
        else {
            // générer les variables
            let x=rnd(99)+1;
            let y1=rnd(99)+1; // y et z sont premiers entre eux
            let z1=rnd(99)+1;
            let y = y1/math.gcd(y1,z1);
            let z = z1/math.gcd(y1,z1);
            let u = x*z; //u et v se simplifient après division par z
            let v= y*z;
            kat.innerHTML= `${u}/${v} \\Large =`;
            kat2.innerHTML = `/`;

            inpt.type = "text"; //zone réponse 1
            inpt.id = `input${pas}`;
            inpt.class = "answers";

            inpt2.type = "text"; //zone réponse 2
            inpt2.id = `inputy${pas}`;
            inpt2.class = "answers";

            asw1[pas] = x; //set la valeur de la réponse 1
            asw2[pas] = y; //set la valeur de la réponse 2
        }
    }
    // Render les maths
    render_katex();
}

function score() {

    let score = 0;
    for (let pas = 0; pas < 10; pas++) {
        // Récupérer l'élément avec pr id 'input0', 'input1'...
        let inpt = document.getElementById(`input${pas}`);
        let inpt2 = document.getElementById(`inputy${pas}`)
        // Si la valeur entrée par l'utilisateur dans le input correspond à la réponse enregistrée dans asw, rajouter un point, sinon rien.
        if (inpt.value == asw1[pas] && inpt2.value == asw2[pas]) {
            score++;
        }
    }
    // Récupère l'élément destiné à contenir l'affichage du score
    let scdiv = document.getElementById('score');
    // Changer son texte pour afficher le score obtenu
    scdiv.innerHTML = `Votre score est de ${score}/10`;
    // En fonction du score obtenu, rajouter un petit mot et changer la classe de l'élément (pour styling plus tard)
    if (score == 10) {
        scdiv.innerHTML += " Bravo!";
        scdiv.className = "vgood"
    }
    else if (score <= 1) {
        scdiv.innerHTML += " Révisez!";
        scdiv.className = "vbad";
    }
    else if (score < 5) {
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
