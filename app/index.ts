import { getNavigationState } from './local-state';

const navigationState = getNavigationState();
if (navigationState) {
	switch (navigationState.view) {
		case 'pokemon-list': {
			import('./views/pokemon-list')
				.then(m => m.default(navigationState.state))
				.catch(e => console.error(e));
			break;
		}
		case 'pokemon-details': {
			import('./views/pokemon-details')
				.then(m => m.default(navigationState.state))
				.catch(e => console.error(e));
			break;
		}
	}
} else {
	import('./views/main').catch(e => console.error(e));
}
