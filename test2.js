let puits = document.getElementById('inserting');

let div = puits.appendChild(document.CreateElement("div"));
let kat = div.appendChild(document.createElement("katex"));
let inpt = div.appendChild(document.createElement("input"));
kat.innerHTML = `100`;


function racine(){
    kat.innerHTML += `$\\sqrt{}`;
}

