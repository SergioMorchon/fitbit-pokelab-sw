import typeComponent from './type';
import { byId } from '../ui';

export default (element: Element, [type1, type2]: readonly number[]) => {
	typeComponent(byId('type-1', element), type1);
	typeComponent(byId('type-2', element), type2);
};
