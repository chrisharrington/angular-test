import template from './template.ng.html';
import './style.scss';

export default app => {
	app.directive('list', () => {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: template,
			link: link,
			scope: '=list'
		};
	});
}

function link(scope, element) {
	scope.$watch('addresses', function() {
		
	});
}
