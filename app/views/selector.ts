import { loadUI, byId, handleBack } from '../ui';

loadUI('selector');

const selector = byId('selector');

export type Option = {
	readonly value: number;
	readonly text: string;
};

export default (options: readonly Option[]) => {
	const itemsCount = selector.getElementsByClassName('item').length;
	for (let i = 0; i < itemsCount; i++) {
		const item = byId(String(i), selector) as TextElement;
		if (i < options.length) {
			item.style.visibility = 'inherit';
			item.text = options[i].text;
		} else {
			item.style.visibility = 'hidden';
		}
	}

	handleBack(() => {
		const selectedValue = options[selector.value as number].value;
		import('./pokemon-list')
			.then(m => {
				m.default(selectedValue);
			})
			.catch(e => console.error(e));
	});
};
