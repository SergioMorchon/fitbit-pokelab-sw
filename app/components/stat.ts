import { getStatName } from '../strings';
import { byId } from '../ui';

export default (
	element: Element,
	stat: number,
	value: number,
	relativeValue: number,
) => {
	const nameElement = byId('name', element) as TextElement;
	nameElement.text = getStatName(stat);

	const valueElement = byId('value', element) as TextElement;
	valueElement.text = String(value);

	if (relativeValue !== 0) {
		const fill = relativeValue > 0 ? '#9fb' : '#f99';
		nameElement.style.fill = fill;
		valueElement.style.fill = fill;
	}
};
