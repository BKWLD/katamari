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
		Icons = require('modules/views/Icons');
	
	// Instantiate backbone views
	var slider = new Slider({el: $('.slider')[0]});
	var icons = new Icons({el: $('.icons')[0]});

});

// Start the application
require(['main']);