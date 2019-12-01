import { getNavigationState } from './local-state';
// import './debug';

const navigationState = getNavigationState();
const loadMainView = () => import('./views/main').catch(e => console.error(e));
if (navigationState) {
	switch (navigationState.view) {
		case 'pokemon-list': {
			import('./views/pokemon-list')
				.then(m => m.default(navigationState.state))
				.catch(e => console.error(e));
			break;
		}
		default: {
			loadMainView();
		}
	}
} else {
	loadMainView();
}
