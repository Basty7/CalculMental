class Polynome {
    constructor(DegreeOrStringOrList) {
        if (typeof DegreeOrStringOrList === 'number') {
            this.list = new Array(DegreeOrStringOrList + 1).fill(0);
            this.degree = DegreeOrStringOrList;
            this.minimalise();
        } else if (typeof DegreeOrStringOrList === 'string') {
            this.list = this.fromString(DegreeOrStringOrList);
            this.degree = this.list.length;
            this.minimalise();
        } else {
            this.list = new Array(DegreeOrStringOrList.length).fill(0).map((_, i) => DegreeOrStringOrList[i] || 0);
            this.degree = this.list.length;
            this.minimalise();
        }
    }

    fromString(polynomialString) {
        // TODO: Si on a x^{34} ça fout le sbeul donc il faut regler ça
        let Px;
        if (polynomialString.startsWith("{") && polynomialString.endsWith("}")) {
            Px = polynomialString.split(/\{|\}/)[1].trim(); // Extraire le polynome si il est dans {}
        } else if (polynomialString.startsWith("(") && polynomialString.endsWith(")")) {
            Px = polynomialString.split(/\(|\)/)[1].trim(); // Extraire le polynome si il est dans {}
        } else {
            Px = polynomialString.trim();
        }

        let polyList = Px.split(" + ");
        let Coeffslist = [];

        for (let monome of polyList) {
            if (!monome.includes("x")) {
                Coeffslist[0] = Number(monome.trim());
            } else if (!monome.includes("x^")) {
                Coeffslist[1] = Number(monome.split("x")[0].trim());
            } else {
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
        return new Array(Coeffslist.length).fill(0).map((_, i) => Coeffslist[i] || 0);
    }

    minimalise() {
        while (this.list.length > 1 && this.list[this.list.length - 1] === 0) {
            this.list.pop();
        }
        this.degree = this.list.length - 1;
    }

    toString() {
        return this.list
            .map((coeff, exp) => (coeff !== 0 ? `${coeff}x^${exp}` : null))
            .filter(term => term !== null)
            .reverse()
            .join(" + ");
    }

    add(other) {
        const maxDegree = Math.max(this.list.length, other.list.length) - 1;
        const result = new Polynome(maxDegree);

        for (let i = 0; i <= maxDegree; i++) {
            const coeff1 = this.list[i] || 0;
            const coeff2 = other.list[i] || 0;
            result.list[i] = coeff1 + coeff2;
        }

        return result;
    }

    derive() {
        let derivedCoeffs = [];
        for (let exp = 1; exp < this.list.length; exp++) {
            if (this.list[exp] !== 0) {
                derivedCoeffs[exp - 1] = this.list[exp] * exp;
            }
        }
        const derivedPoly = new Polynome(derivedCoeffs.length - 1);
        derivedPoly.list = derivedCoeffs;
        return derivedPoly;
    }
}

// Example usage:
let poly = new Polynome("3x^2 + 2x^1 + 0");
poly.minimalise();
console.log(poly.toString()); // Output: "3x^2 + 2x^1"

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