let graphe = document.getElementById('inserting');

function generer(){
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
    Plotly.newPlot(graphe, data, layout);
}

