/**
 * Use this only for development.
 * Just import it and watch for memory leaks while navigating.
 */
import { memory } from 'system';

const logMemory = () => {
	console.log(
		`Memory usage: ${(memory.js.used / memory.js.total).toFixed(2)}, peak ${(
			memory.js.peak / memory.js.total
		).toFixed(2)}`,
		`Memory pressure: ${memory.monitor.pressure}`,
	);
};

setInterval(logMemory, 2000);

memory.monitor.onmemorypressurechange = logMemory;
