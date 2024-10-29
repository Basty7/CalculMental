puits = document.getElementById('inserting');

let asw = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

function generer() {
    for (let pas = 0; pas < 10; pas++) {
        let x = rnd(100);
        let y = rnd(100);
        // Créer un div avec un katex et un input
        let div = puits.appendChild(document.createElement("div"));
        let kat = div.appendChild(document.createElement("katex"));
        let inpt = div.appendChild(document.createElement("input"));
        // puits.appendChild(document.createElement("br"));
        // Remplir le katex et l'input
        kat.innerHTML = `${x} + ${y} `;
        inpt.type = "text";
        inpt.id = `input${pas}`;
        inpt.class = "answers";
        asw[pas] = x + y;
    }
    render_katex();
}

function score() {
    let score = 0;
    for (let pas = 0; pas < 10; pas++) {
        let inpt = document.getElementById(`input${pas}`);
        if (inpt.value == asw[pas]) {
            score++;
        }
    }
    let scdiv = document.getElementById('score');
    scdiv.innerHTML = `Votre score est de ${score}/10`;
    if (score == 10) {
        scdiv.innerHTML += " Bravo!";
        scdiv.classList.add("vgood");
    }
    else if (score == 0) {
        scdiv.innerHTML += " Révisez!";
        scdiv.classList.add("vbad");
    }
    else if (score < 5) {
        scdiv.innerHTML += " Vous pouvez faire mieux!";
        scdiv.classList.add("bad");
    }
    else {
        scdiv.innerHTML += " Pas mal!";
        scdiv.classList.add("good");
    }

}