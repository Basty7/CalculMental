console.log("polynome.js loaded");

/**
 * Classe qui représente un polynôme
 * Concrètement, il s'agit de simples listes mais le formalisme de la structure d'objet permet une utilisation beaucoup plus simple !
 */
class Polynome {
	/**
	* Class Polynome
	* @param {number|string|Array} DegreeOrStringOrList - Le degré du polynôme, une représentation textuelle (latex), ou une liste de ses coefficients
	*/
	constructor(DegreeOrStringOrList) {
		if (typeof DegreeOrStringOrList == "number") {
			this.list = new Array(DegreeOrStringOrList + 1).fill(1);
		} else if (typeof DegreeOrStringOrList == "string") {
			this.list = this.fromString(DegreeOrStringOrList);
			this.minimalise();
		}
		else {
			this.list = new Array(DegreeOrStringOrList.length).fill(0).map((_, i) => DegreeOrStringOrList[i] || 0);
			this.minimalise();
		}
	}

	/**
	 * Change le coefficient pour un exposant donné
	 * @param {number} exp L'exposant dont il faut modifer le coeff
	 * @param {number} coeff Le coefficient
	 * @returns {number} Le coefficient attribué
	 */
	setcoeff(exp, coeff) {
		this.list[exp] = coeff;
		this.list = new Array(this.list.length).fill(0).map((_, i) => this.list[i] || 0);
		this.minimalise();
		return coeff;
	}

	/**
	 * Récuperer un coefficient
	 * @param {number} exp L'exposant pour lequel on cherche le coeff
	 * @returns {number} Le coefficient correspondant à l'exposant en entrée
	*/
	getcoeff(exp) {
		return this.list[exp] || 0;
	}

	/**
	 * Ajoute un coefficient pour un exposant donné
	 * @param {number} exp L'exposant dont il faut modifer le coeff
	 * @param {number} coeff Le coefficient
	 * @returns {number} Le nouveau coefficient
	 */
	addcoeff(exp, coeff) {
		this.setcoeff(exp, this.getcoeff(exp) + coeff);
		this.minimalise();
		return this.getcoeff(exp);
	}

	/**
	 * Obtenir le degré du polynôme. ATTENTION! minimalise le polynôme
	 * @returns {number} Le degré du polynôme
	 */
	getdegree() {
		this.minimalise();
		return this.list.length - 1;
	}

	/**
	 * Convertit la représentation textuelle en liste
	 * @param {string} polynomialString - La chaine de caractère représentant le polynôme
	 * @returns {Array} La liste des coefficients
	 */
	fromString(polynomialString) {
		let px
		if (polynomialString.startwith("{") && polynomialString.endswith("}")) {
			Px = polynomialString.split(/\{|\}/)[1].trim(); // Extraire le polynome si il est dans {}
		}
		else if (polynomialString.startwith("(") && polynomialString.endswith(")")) {
			Px = polynomialString.split(/\(|\)/)[1].trim(); // Extraire le polynome si il est dans ()
		}
		else {
			Px = polynomialString.trim();
		}
		if (Px == "") {
			return [1];
		}
		let polyList = Px.split(" + ");
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
		let xlist = new Array(this.getdegree() + 1);
		for (let exp in this.list) {
			if (exp == 0 && this.getcoeff(0) != 0) {
				xlist[0] = this.getcoeff(0);
			}
			else if (exp == 1 && this.getcoeff(1) != 0) {
				xlist[1] = `${this.getcoeff(1)}x`;
			}
			else if (this.getcoeff(exp) != 0) {
				xlist[exp] = `${this.getcoeff(exp)}x^${exp}`;
			}
		}
		return xlist.reverse().join(" + ");
	}

	/**
	 * Additione deux polynômes
	 * @param {Polynome} other - Le Polynôme à additioner au premier
	 */
	add(other) {
		for (let i in this.list) {
			this.addcoeff(i, other.getcoeff(i));
		}
	}

	/**
	 * Multiplie 2 polynômes entre eux
	 * @param {Polynome} other Le polynôme à multiplier
	 * @returns {Polynome} Le produit des deux polynomes
	 */
	multiplie(other) {
		let maxLength = this.getdegree() + other.getdegree();
		this.minimalise();
		other.minimalise();

		let Product = new Polynome(maxLength);
		for (let exp = 0; exp < maxLength; exp++) {
			for (let exp2 = 0; exp2 < maxLength; exp2++) {
				Product.addcoeff(exp + exp2, this.getcoeff(exp) * other.getcoeff(exp2));
			}
		}
		return Product;
	}

	/**
	 * Dérive un polynôme
	 * @returns {Polynome} Le polynôme dérivé
	 */
	derive() {
		let derivedPoly = new Polynome(this.getdegree());
		for (let exp in this.list) {
			if (exp != 0) {
				derivedPoly.setcoeff(exp - 1, this.getcoeff(exp) * exp);
			}
		}
		return derivedPoly;
	}
	/**
	 * Nettoie/minimalise le polynôme
	 * @returns {Polynome} Le même polynôme mais nettoyé (si jamais le terme de plus haut degré a un coeff nul ou NaN)
	 */
	minimalise() {
		if ((this.list[this.list.length - 1] == 0 || isNaN(this.list[this.list.length - 1])) && this.list.length > 1) {
			this.list = this.list.slice(-1);
			return this.minimalise()
		}
		else {
			return this;
		}
	}
}


function derviveexp(fn) {
	// Partons du principe que `fonction` est sous la forme "P(x)*e^Q(x)" où P et Q sont des polinômes

	let fn2 = fn.split("e^");
	let Px_Part = fn2[0];
	let Qx_part = fn2[1];
	let Px = Polynome(Px_Part);
	let Qx = Polynome(Qx_part);

	return `(${Px.derive().add(Px.multiplie(Qx.derive())).toString()})e^(${Qx.toString()})`
}

// function reconnexp(fn) {

// }