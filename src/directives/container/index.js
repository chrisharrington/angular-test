import template from './template.ng.html';
import './style.scss';

import AddressFactory from 'data/addresses/index.js';

import map from 'directives/map';
import list from 'directives/list';

export default app => {
	map(app);
	list(app);

	app.directive('container', () => {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: template,
			link: {
				pre: function(scope) {
					scope.addresses = [];
					scope.refresh = getAddresses;
					scope.shown = 'map';
					scope.toggle = toggleView;

					getAddresses();

					function getAddresses() {
						AddressFactory.get().then(addresses => {
							scope.$apply(() => scope.addresses = addresses);
						});
					}

					function toggleView() {
						scope.shown = scope.shown === 'list' ? 'map' : 'list';
					}
				}
			}
		};
	});
}