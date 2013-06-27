// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		app = require('modules/app');
	
	// Init view
	var View = {
 
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$exp = this.$('p').find('span');
		
		// listen for output change
		app.on('updateOutput', this.updateOutput);
	};

	// Update the output view here
	View.updateOutput = function(params) {
		this.$exp.html(params.exp);
	};	
	
	// Return the view
	return Backbone.View.extend(View);
	
});