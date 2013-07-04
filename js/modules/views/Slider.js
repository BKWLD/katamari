// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		tram = require('plugins/tram'),
		app = require('modules/app');
	
	// Init view
	var View = {
		isMouseDown: false,
		isMouseDragging: false,
		power: 1.3,
		divisor: 2
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$grabber = this.$('.grabber');
		this.$bg = this.$('.bg');
		this.$scale = this.$('.scale');
		this.width = this.$el.width();
		this.grabber_width = this.$grabber.width();
		this.offset_left = this.$el.offset().left;
		this.$ouptut = this.$('.meters');

		// throttled mouse move
		var throttledMouseMove = _.throttle(this.onMouseMove, 20);
		this.$el.on('mousemove', throttledMouseMove);

		// attach the mouse up listener on the document
		$(document).on('mouseup', this.onMouseUp);

		// Setup scale
		this.setupScale();
		
		// Roll out the Katamari
		var from = (-this.offset_left - this.grabber_width), to = 20;
		tram(this.$grabber)
			.set({left: from})
			.add('left 1s ease-out')
			.add('transform 1s ease-out')
			.start({left: to, rotate: 360})
			.then(function() { this.stop() }); // Remove transforms
			
		
		// Update output while that animation happens
		tram.tween({ from: from, to: to, duration: 1000, ease: 'ease-out', update: _.bind(function(x) {
			this.render(x + this.grabber_width/2, true);
		}, this)});
		
	};

	// Events
	View.events = {
		'mousedown .grabber': 'onMouseDown'
	};
	
	// Convert an x offset to meters.  This is the what powers the exponential equation
	View.scale = function(x) {
		return Math.pow(x/30, 3.6);
	};

	// Set up the scale values
	View.setupScale = function() {
		this.$scale.find('.left').text(Math.round(this.scale(0))+'m');
		this.$scale.find('.right').text(Math.round(this.scale(this.width))+'m');
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
	
	// Handle dragging
	View.onMouseMove = function(e) {
		if(!this.isMouseDown) return;
		this.isDragging = true;

		// Get current x position relative to the div
		var x = e.pageX - this.offset_left;
		
		// Update everything
		this.render(x);
	};
	
	// Update the display
	View.render = function(x, dont_move_grabber) {
		
		// Constrain the movement by bounds and move the dragger
		x = Math.max(1, Math.min(x, this.width));
		if (!dont_move_grabber) this.$grabber.css('left', x - this.grabber_width/2);
		
		// Get meters
		var meters = this.scale(x);
		
		// Update the meters
		this.$ouptut.text(Math.round(meters*10)/10+' meters');
		
		// Tell output module about the change
		app.trigger('updateOutput', {x:x, meters: meters});
	};

	View.initialPotition = function() {
		var x = this.$el.offset().left - 60;
		var exp = this.scale(x);
		_.defer(function() { app.trigger('updateOutput', {meters: exp}); });
	};

	// Return the view
	return Backbone.View.extend(View);
	
});