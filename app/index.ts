// import './debug';

import('./views/pokemon-list')
	.then(m => m.default())
	.catch(e => console.error(e));
