function derivepolynome(polynome) {
	let lesmonomes = polynome.split(" + ");
	let polynomederive = "";
	for (let i = 0; i < lesmonomes.length; i++) {
		let monome = lesmonomes[i].trim(); // Enlève les espaces
		if (monome != "") {
			polynomederive += derivemonome(monome) + " + ";
		}
	}
	// Enlever le " + "
	if (polynomederive.endsWith(" + ")) {
		polynomederive = polynomederive.slice(0, -3);
	}
	return polynomederive;
}

function derivemonome(monome) {
	let monomelist = monome.split("x^");
	let coeff = Number(monomelist[0].trim()); // Récuperer le coeff devant le x, --> trim() Enlever les espaces
	let expPart = monomelist[1].trim();
	let exp;
	if (expPart.includes("{") && expPart.includes("}")) {
		exp = Number(expPart.split(/\{|\}/)[1]); // Extraire l'exposant si il est dans {}
	} else {
		exp = Number(expPart); // Extraire l'exposant si il n'est pas dans {}
	}
	return `${coeff * exp}x^${exp - 1}`;
}

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
	polyList = polynome.split(" + ");
	expslist = [];
	for (let monome of polyList) {
		let coeff = Number(monome.split("x^")[0].trim());
		let expPart = monome.split("x^")[1].trim();
		let exp;
		if (expPart.includes("{") && expPart.includes("}")) {
			exp = Number(expPart.split(/\{|\}/)[1].trim()); // Extraire l'exposant si il est dans {}
		} else {
			exp = Number(expPart.trim()); // Extraire l'exposant si il n'est pas dans {}
		}
		expslist[exp] = coeff;
	}
	return expslist;
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