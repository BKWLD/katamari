// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		app = require('modules/app'),
		katamari = require('plugins/katamari');
	
	// Init view
	var View = {
 		meters: null
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$meters = this.$('.meters').find('span');
		this.$katamari = this.$('.katamari').find('span');
		
		// listen for output change
		app.on('updateOutput', this.updateOutput);
	};

	// Update the output view here
	View.updateOutput = function(params) {
		this.meters = Math.round(params.exp);
		this.$meters.html(this.meters);
		this.$katamari.html(katamari(this.meters));
	};	
	
	// Return the view
	return Backbone.View.extend(View);
	
});