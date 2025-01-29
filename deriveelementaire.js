/**
 * Classe qui représente un polynôme
 */
class Polynome {

	/**
	* Class Polynome
	* @param {number|string|Array} DegreeOrStringOrList - Le degré du polynôme, une représentation textuelle (latex), ou une liste de ses coefficients
	*/
	constructor(DegreeOrStringOrList) {
		if (typeof DegreeOrStringOrList == Number) {
			this.list = new Array(DegreeOrStringOrList + 1).fill(0);
			this.degree = DegreeOrStringOrList;
			this.minimalise();
		} else if (typeof DegreeOrStringOrList == String) {
			this.list = this.fromString(DegreeOrStringOrList);
			this.degree = this.list.length;
			this.minimalise;
		}
		else {
			this.list = new Array(DegreeOrStringOrList).fill(0).map((_, i) => DegreeOrStringOrList[i] || 0);
			this.degree = this.list.length;
			this.minimalise()
		}
	}

	/**
	 * Covertit la représentation textuelle en liste
	 * @param {string} polynomialString - La chaine de caractère représentant le polynôme
	 * @returns {Array} La liste des coefficients
	 */
	fromString(polynomialString) {
		// TODO: Si on a x^{34} ça fout le sbeul donc il faut regler ça
		if (polynomialString.startwith("{") && polynomialString.endswith("}")) {
			Px = polynomialString.split(/\{|\}/)[1].trim(); // Extraire le polynome si il est dans {}
		}
		else if (polynomialString.startwith("(") && polynomialString.endswith(")")) {
			Px = polynomialString.split(/\(|\)/)[1].trim(); // Extraire le polynome si il est dans {}
		}
		else {
			Px = polynomialString.trim();
		}

		let polyList = polynomialString.split(" + ");
		let Coeffslist = [];

		for (let monome of polyList) {
			if (!monome.includes("x")) {
				Coeffslist[0] = Number(monome.trim())
			}
			else if (!monome.includes("x^")) {
				Coeffslist[1] = Number(monome.split("x")[0].trim())
			}
			else {
				let coeff = Number(monome.split("x^")[0].trim()) || 1; // le ||1 permet de remplacer par 1 si la fonction Number échoue
				let expPart = monome.split("x^")[1].trim();
				let exp;
				if (expPart.includes("{") && expPart.includes("}")) {
					exp = Number(expPart.split(/\{|\}/)[1].trim()); // Extraire l'exposant si il est dans {}
				} else {
					exp = Number(expPart.trim()); // Extraire l'exposant si il n'est pas dans {}
				}
				Coeffslist[exp] = coeff;
			}
		}
		return new Array(Coeffslist.length).fill(0).map((_, i) => Coeffslist[i] || 0);;
	}

	/**
	 * Renvoie une représentation textuelle du polynôme
	 * @returns {string} Une représentation textuelle du polynôme
	 */
	toString() {
		return this.list.reverse().join(" + ");
	}

	/**
	 * Additione deux polynômes
	 * @param {Polynome} other - Le Polynôme à additioner au premier
	 */
	add(other) {
		QasList = new Array(maxLength).fill(0).map((_, i) => other.list[i] || 0);

		// convertir la liste des exposants en polynome
		for (let i in PasList) {
			this.list[i] += QasList[i];
		}
	}
	
	/**
	 * Dérive un polynôme
	 * @returns {Polynome} Le polynôme dérivé
	 */
	derive() {
		let result = []

		for (let exp in this.list) {
			if (this.list[exp] * exp != 0) {
				result[exp - 1] = this.list[exp] * exp;
			}
		}
		const derivedPoly = new Polynome(this.list.length - 1);
		derivedPoly.list = result;
		return derivedPoly;
	}
	/**
	 * Nettoie/minimalise le polynôme
	 * @returns {Polynome} Le même polynôme mais nettoyé (si jamais le terme de plus haut degré a un coeff nul ou NaN)
	 */
	minimalise() {
		if ((this.list[this.degree - 1] == 0 || isNaN(this.list[this.degree])) && this.degree > 0) {
			return new Polynome(this.list.slice(-1));
		}
		else {
			return this;
		}
	}
}



function mutipliepolynome(Px, Qx) {
	let PasList = ConvertPolynomeToList(Px);
	let QasList = ConvertPolynomeToList(Qx);

	// S'assurer que les deux tableaux ont la même longueur et convertir les 'NaN' en 0
	let maxLength = Math.max(PasList.length, QasList.length);
	// Code de Copilot... map() parcourt le tableau pour associer à chaque élément son nombre s'il est défini, 0 sinon
	PasList = new Array(maxLength).fill(0).map((_, i) => PasList[i] || 0);
	QasList = new Array(maxLength).fill(0).map((_, i) => QasList[i] || 0);

	console.log(PasList, '\n', QasList);

	let ProductList = new Array(maxLength * 2).fill(0);
	for (let exp = 0; exp < maxLength; exp++) {
		for (let exp2 = 0; exp2 < maxLength; exp2++) {
			ProductList[exp + exp2] += PasList[exp] * QasList[exp2];
			console.log(ProductList[exp + exp2]);
		}
	}

	let result = []
	for (let exp in ProductList) {
		if (ProductList[exp] !== 0) {
			result.push(`${ProductList[exp]}x^${exp}`);
		}
	}
	result.reverse()
	return result.join(" + ")

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