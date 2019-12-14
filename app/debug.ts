import { memory, MemoryUsage } from 'system';

const proportion = (v1: number, v2: number) => Number((v1 / v2).toFixed(2));

let lastMemoryUsage: MemoryUsage | void;

const diffLastMemoryUsage = (memoryUsage: MemoryUsage) =>
	lastMemoryUsage ? memoryUsage.used - lastMemoryUsage.used : NaN;

export const logMemory = (message = 'Memory') => {
	const memoryUsage = {
		used: memory.js.used,
		total: memory.js.total,
		peak: memory.js.peak,
	};
	console.log(
		`${message}: ${proportion(
			memoryUsage.used,
			memory.js.total,
		)} (${diffLastMemoryUsage(memoryUsage)}B), peak ${proportion(
			memoryUsage.peak,
			memoryUsage.total,
		)}, pressure ${memory.monitor.pressure}`,
	);
	lastMemoryUsage = memoryUsage;
};
