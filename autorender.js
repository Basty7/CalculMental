console.log('autorender.js loaded'); //ceci permet de vérifer que le script est chargé

function render_katex() {
	katexs = document.getElementsByTagName('katex');
	for (let i = 0; i < katexs.length; i++) {
		let el = katexs[i];
		katex.render(el.textContent, el, {
			throwOnError: false
		});
	}
}

function render_katex_in_element(element) {
	katex.render(element.textContent, element, {
		throwOnError: false
	});
}