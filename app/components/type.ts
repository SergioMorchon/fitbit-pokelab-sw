import { getTypeName } from '../strings';
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

export default (element: Element, type: number | void) => {
	const square = byId('square', element) as RectElement;
	const text = byId('text', element) as TextElement;

	if (typeof type !== 'number') {
		square.style.visibility = 'hidden';
		text.style.visibility = 'hidden';
		return;
	}

	square.style.visibility = 'visible';
	text.style.visibility = 'visible';
	square.style.fill = colors[type];
	text.text = getTypeName(type);
};
