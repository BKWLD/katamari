// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');
	
	// Init view
	var View = {
		letters: ['K', 'a', 't', 'a', 'm', 'a', 'r', 'i'],
		colors: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'],
		colorInterval: null,
		changeSpeed: 80
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
		this.colorInterval = setInterval(_.bind(function() { this.setColor($(e.currentTarget)); }, this), this.changeSpeed);
	};

	View.onLetterOut = function(e) {
		clearInterval(this.colorInterval);
	};
	
	// Set the color of the letter
	View.setColor = function(letter) {
		letter.removeClass();
		var randColor = Math.floor(Math.random()*this.colors.length);
		letter.addClass(this.colors[randColor]);
	};

	// Return the view
	return Backbone.View.extend(View);
	
});