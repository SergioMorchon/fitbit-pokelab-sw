export default (element: Element) => {
	const text = element.getElementById('text') as TextElement;
	return {
		get text() {
			return text.text;
		},
		set text(value) {
			text.text = value;
		},
	};
};
