import Leaflet from 'leaflet';

import template from './template.ng.html';

import './style.scss';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl
});

export default app => {
	app.directive('map', () => {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: template,
			link: link,
			scope: '=map'
		};
	});
}

function link(scope, element) {
	var map = Leaflet.map(element[0]).setView([51.505, -0.09], 13),
		markers = new Leaflet.FeatureGroup();

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	map.addLayer(markers);

	scope.$watch('addresses', function() {
		markers.clearLayers();

		scope.addresses.forEach(address => {
			var marker = Leaflet.marker([address.latitude, address.longitude]);
			marker.bindPopup(address.firstName + ' ' + address.lastName);
			markers.addLayer(marker);
		});

		if (scope.addresses.length > 0)
			map.fitBounds(markers.getBounds());
	});

	// L.marker([51.5, -0.09]).addTo(map)
	//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	//     .openPopup();
}
