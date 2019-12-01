import typeComponent from './type';
import { byId } from '../ui';

export default (element: Element) => {
	const typeComponent1 = typeComponent(byId('type-1', element));
	const typeComponent2 = typeComponent(byId('type-2', element));
	return {
		set types([type1, type2]: readonly number[]) {
			typeComponent1.type = type1;
			if (typeof type2 === 'number') {
				typeComponent2.isVisible = true;
				typeComponent2.type = type2;
			} else {
				typeComponent2.isVisible = false;
			}
		},
	};
};
