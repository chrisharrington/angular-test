import angular from 'angular';

import './style.scss';

import container from './directives/container';

var app = angular.module('addresses-application', []);

app.controller('addresses-controller', function($scope) {
	
});

container(app);