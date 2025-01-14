function derivepolynome(polynome) {
	let monomes = polynome.split(" + ");
	let polynomederive = "";
	for (let i = 0; i < monomes.length; i++) {
		let monome = monomes[i].trim(); // Trim whitespace
		if (monome !== "") {
			polynomederive += derivemonome(monome) + " + ";
		}
	}
	// Remove the trailing " + "
	if (polynomederive.endsWith(" + ")) {
		polynomederive = polynomederive.slice(0, -3);
	}
	return polynomederive;
}

function derivemonome(monome) {
	let monomelist = monome.split("x^");
	let coeff = Number(monomelist[0].trim()); // Trim whitespace
	let expPart = monomelist[1].trim();
	let exp;
	if (expPart.includes("{") && expPart.includes("}")) {
		exp = Number(expPart.split(/\{|\}/)[1]); // Extract exponent if in {}
	} else {
		exp = Number(expPart); // Extract exponent if not in {}
	}
	return `${coeff * exp}x^${exp - 1}`;
}