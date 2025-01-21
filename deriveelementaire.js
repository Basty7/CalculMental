function derivepolynome(polynome) {
	let polyList = ConvertPolynomeToList(polynome);
	let result = []
	console.log(polyList);
	
	if (polyList[1] != 0 && polyList[1]) { result.push(polyList[1]) }
	if (polyList[2] != 0 && polyList[2]) { result.push(`${2 * polyList[2]}x`) }
	for (let exp in polyList) {
		if (polyList[exp] * exp != 0 && exp > 2) {
			result.push(`${polyList[exp] * exp}x^${exp - 1}`)
			console.log("been here", exp);
		}
	}
	result.reverse()
	return result.join(" + ");
}

// function derivemonome(monome) {
// 	let monomelist = monome.split("x^");
// 	let coeff = Number(monomelist[0].trim()); // Récuperer le coeff devant le x, --> trim() Enlever les espaces
// 	let expPart = monomelist[1].trim();
// 	let exp;
// 	if (expPart.includes("{") && expPart.includes("}")) {
// 		exp = Number(expPart.split(/\{|\}/)[1]); // Extraire l'exposant si il est dans {}
// 	} else {
// 		exp = Number(expPart); // Extraire l'exposant si il n'est pas dans {}
// 	}
// 	return `${coeff * exp}x^${exp - 1}`;
// }

function additionpolynome(Px, Qx) {
	let PasList = ConvertPolynomeToList(Px);
	let QasList = ConvertPolynomeToList(Qx);
	let maxLength = Math.max(PasList.length, QasList.length);

	// Code de Copilot... map() parcourt le tableau pour associer à chaque élément son nombre s'il est défini, 0 sinon
	PasList = new Array(maxLength).fill(0).map((_, i) => PasList[i] || 0);
	QasList = new Array(maxLength).fill(0).map((_, i) => QasList[i] || 0);

	// convertir la liste des exposants en polynome
	let result = []
	for (let i in PasList) {
		sommecoeff = PasList[i] + QasList[i];
		if (sommecoeff !== 0) {
			result.push(`${sommecoeff}x^${i}`);
		}
	}
	result.reverse()
	return result.join(" + ")

}

function ConvertPolynomeToList(polynome) {
	let polyList = polynome.split(" + ");
	let expslist = [];
	console.log(polyList);

	for (let monome of polyList) {
		console.log("there");

		if (!monome.includes("x")) {
			expslist[0] = Number(monome.trim())
		}
		else if (!monome.includes("x^")) {
			expslist[1] = Number(monome.split("x")[0].trim())
		}
		else {
			let coeff = Number(monome.split("x^")[0].trim())||1; // le ||1 permet de remplacer par 1 si la fonction Number échoue
			let expPart = monome.split("x^")[1].trim();
			let exp;
			if (expPart.includes("{") && expPart.includes("}")) {
				exp = Number(expPart.split(/\{|\}/)[1].trim()); // Extraire l'exposant si il est dans {}
			} else {
				exp = Number(expPart.trim()); // Extraire l'exposant si il n'est pas dans {}
			}
			expslist[exp] = coeff;
		}
	}
	return new Array(expslist.length).fill(0).map((_, i) => expslist[i] || 0);;
}

function derviveexp(fn) {
	// Partons du principe que `fonction` est sous la forme "P(x)* e^Q(x)" où P et Q sont des polinômes

	let fn2 = fn.split("e^");
	let Px_Part = fn[0];
	let Qx_part = fn[1];
	let Px;
	let Qx;

	if (Px_Part.includes("{") && Px_Part.includes("}")) {
		Px = Px_Part.split(/\{|\}/)[1].trim(); // Extraire l'exposant si il est dans {}
	}
	else {
		Px = Px_Part.trim();
	}
	if (Qx_part.includes("{") && Qx_part.includes("}")) {
		Qx = Qx_part.split(/\{|\}/)[1].trim(); // Extraire l'exposant si il est dans {}
	}
	else {
		Qx = Qx_part.trim();
	}
	let dPx = derivepolynome(Px);
	let dQx = derivepolynome(Qx);

	return `${additionpolynome(dPx, multipliepolynome(Px, dQx))}e^{${Qx}}`
}