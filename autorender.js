console.log('autorender.js loaded');


function render_katex() {
	katexs = document.getElementsByTagName('katex');
	for (let i = 0; i < katexs.length; i++) {
		let el = katexs[i];
		katex.render(el.textContent, el, {
			throwOnError: false
		});
	}
}
