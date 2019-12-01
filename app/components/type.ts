import { getTypeName } from '../types';
import { byId } from '../ui';

const colors = [
	'#A8A77A',
	'#C22E28',
	'#A98FF3',
	'#A33EA1',
	'#E2BF65',
	'#B6A136',
	'#A6B91A',
	'#735797',
	'#B7B7CE',
	'#EE8130',
	'#6390F0',
	'#7AC74C',
	'#F7D02C',
	'#F95587',
	'#96D9D6',
	'#6F35FC',
	'#705746',
	'#D685AD',
];

export default (element: Element) => {
	const square = byId('square', element) as RectElement;
	const text = byId('text', element) as TextElement;
	return {
		set type(value: number) {
			square.style.fill = colors[value];
			text.text = getTypeName(value);
		},
		set isVisible(value: boolean) {
			const visibility = value ? 'visible' : 'hidden';
			square.style.visibility = visibility;
			text.style.visibility = visibility;
		},
	};
};
