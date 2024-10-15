puits = document.getElementById('inserting');

function generer() {
    for (let pas=0; pas < 10; pas++){
        let x = rnd(100);
        let y=rnd(100);
        let kat = puits.appendChild(document.createElement("katex"));
        kat.innerHTML = `${x} + ${y} `;
    }
    render_katex();
}