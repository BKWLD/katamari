// Set the require.js configuration for the application
require.config({
	
	baseUrl: '/js/',
	
	// Set common library paths
	paths: {
		jquery: 'empty:',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		socket: '/socket.io/socket.io'
	}
});

// Define the application entry point
define('main', function (require) {
	
	var $ = require('jquery'),
		_ = require('underscore'),
		app = require('modules/app'),
		Slider = require('modules/views/Slider'),
		Conversion = require('modules/views/Conversion'),
		Output = require('modules/views/Output');
	
	// Instantiate backbone views
	var slider = new Slider({el: $('.slider')[0]});
	var conversion = new Conversion({el: $('.conversion')[0]});
	var output = new Output({el: $('.output')[0]})

});

// Start the application
require(['main']);