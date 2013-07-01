// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');
	
	// Init view
	var View = {
		letters: ['K', 'a', 't', 'a', 'm', 'a', 'r', 'i'],
		colors: ['#fb5e73', '#7daa1b', '#fdb1be', '#94be14', '#e3e4ab', '#794fa5', '#4e85bb', '#e1ea81', '#d59647', '#f6988e', '#e4475a', '#efae3a', '#2f5995'],
		colorInterval: null
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		this.buildLogo();
	};

	// Events
	View.events = {
		'mouseover span': 'onLetterOver',
		'mouseout span': 'onLetterOut'
	};

	// Build Logo
	View.buildLogo = function() {
		for(var i = 0; i < this.letters.length; i++) {
			var letter = $('<span>').html(this.letters[i]);
			this.setColor(letter);
			this.$el.append(letter);
		}
	};

	// Randomize all the colors on mouse over
	View.onLetterOver = function(e) {
		this.setColor($(e.currentTarget));
		this.colorInterval = setInterval(_.bind(function() { this.setColor($(e.currentTarget)); }, this), 50);
	};

	View.onLetterOut = function(e) {
		clearInterval(this.colorInterval);
	};
	
	// Set the color of the letter
	View.setColor = function(letter) {
		var randColor = Math.floor(Math.random()*this.colors.length);
		letter.css('color', this.colors[randColor]);
	};

	// Return the view
	return Backbone.View.extend(View);
	
});