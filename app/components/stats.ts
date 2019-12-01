import statComponent from './stat';
import { byId } from '../ui';
import { max, min } from 'scientific';

export default (element: Element, stats: readonly number[]) => {
	const maxStat = max(new Float32Array(stats));
	const minStat = min(new Float32Array(stats));
	stats.forEach((stat, index) => {
		let relativeValue = 0;
		if (stat === maxStat) {
			relativeValue = 1;
		} else if (stat === minStat) {
			relativeValue = -1;
		}
		statComponent(byId(String(index), element), index, stat, relativeValue);
	});
};
