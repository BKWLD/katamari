// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');
	
	// Init view
	var View = {
		isMouseDown: false,
		isMouseDragging: false
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$grabber = this.$('.grabber');
		this.$bg = this.$('.bg');
		this.$scale = this.$('.scale');

		// throttled mouse move
		var throttledMouseMove = _.throttle(this.onMouseMove, 100);
		this.$el.on('mousemove', throttledMouseMove);

		// attach the mouse up listener on the document
		$(document).on('mouseup', this.onMouseUp);
		
	};

	// Events
	View.events = {
		'mousedown .grabber': 'onMouseDown'
	};

	// Mouse Events
	View.onMouseDown = function(e) {
		this.isMouseDown = true;
	};

	View.onMouseUp = function(e) {
		if(!this.isDragging) return;
		this.isMouseDown = false;
		this.isDragging = false;
	};
	
	View.onMouseMove = function(e) {
		if(!this.isMouseDown) return;
		this.isDragging = true;

		//get current x position relative to the div
		var x = e.pageX - this.$el.offset().left;

		//constrain the movement by bounds and move the dragger
		if(x >= 0 && x <= this.$el.width()) this.$grabber.css('left', x - (this.$grabber.width()/2));
	};

	// Return the view
	return Backbone.View.extend(View);
	
});