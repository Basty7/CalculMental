/**
 * Générer un nombre aléatoire
 * @param {number} n 
 * @returns un nombre entier aléatoire dans [[0;n[[
 */
function rnd(n) {
	return Math.floor(Math.random() * n);
}
/**
 * Calcul du PGCD(a;b) par l'algorithme d'Euclide
 * @param {Number} a first parameter
 * @param {Number} b second one
 * @returns GCD(a;b)
 */
function gcd(a, b) {
	if (!b) {
		return a;
	}

	return gcd(b, a % b);
}