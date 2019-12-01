import document from 'document';

export const loadUI = (viewName: string) =>
	document.replaceSync(`./resources/views/${viewName}.gui`);

export const byId = (id: string, root: ElementSearch = document) => {
	const element = root.getElementById(id);
	if (!element) {
		throw Error(`Element id="${id}" not found`);
	}

	return element;
};
