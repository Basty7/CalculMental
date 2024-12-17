let puits = document.getElementById('inserting');

let div = puits.appendChild(document.createElement("div"));
let kat = div.appendChild(document.createElement("katex"));
let inpt = div.appendChild(document.createElement("input"));
kat.innerHTML = `Affichage mathématique`;

function render(){
    kat.innerHTML = inpt.value
    render_katex();
}
function racine(){
    inpt.value += ` \\sqrt{}`;
    kat.innerHTML = inpt.value;
    render_katex();
}
function frac(){
    inpt.value += ` \\frac{}{}`;
    kat.innerHTML = inpt.value;
    render_katex();
}