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
		this.$katamari = this.$('.katamari');
		this.$icons = this.$('.icons');
		
		// listen for output change
		app.on('updateOutput', this.updateOutput);
	};

	// Update the output view here
	View.updateOutput = function(params) {
		var meters = params.meters;
		this.$katamari.html(katamari(meters));

		var detailedOutput = katamari(meters, 'default', {output: 'object'}),
			numIcons = Math.floor(detailedOutput.value),
			remainder = detailedOutput.value - numIcons;
		
		var iconImage;
		switch(detailedOutput.unit) {
			case "garden gnome":
				iconImage = "gnome.png";
				break;
			case "bicycle":
				iconImage = "bike.png";
				break;
			case "elephant":
				iconImage = "elephant.png";
				break;
			case "school bus":
				iconImage = "bus.png";
				break;
			case "dragon":
				iconImage = "dragon.png";
				break;
			case "roman colosseum":
				iconImage = "colosseum.png";
				break;
			case "starship enterprise":
				iconImage = "enterprise.png";
				break;
			case "golden gate bridge":
				iconImage = "bridge.png";
				break;
		}

		// empty the current div of icons
		this.$icons.empty();
		
		for(var i = 0; i < numIcons; i++) {
			var icon = $('<div>').addClass('icon');
			var span = $('<span>');
			icon.append(span);
			span.css('background-image', 'url("img/icons/' + iconImage + '")');
			this.$icons.append(icon);
		}

		//if remainder, add it here
		if(remainder > 0) {
			var icon = $('<div>').addClass('icon');
			var span = $('<span>');
			icon.append(span);
			span.css('background-image', 'url("img/icons/' + iconImage + '")');
			span.css('width', remainder*100 + '%');
			this.$icons.append(icon);
		}

	};	
	
	// Return the view
	return Backbone.View.extend(View);
	
});