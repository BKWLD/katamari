// Generates the modal window when an item is clicked
define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		app = require('modules/app'),
		tram = require('plugins/tram');
	
	// Init view
	var View = {
		isActive: false,
		dir: 'forward',
		vertical: 'none',
		minY: 0,
		maxY: $(window).height(),
		randomDelay: 5000,
		speed: 1
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$forward = this.$el.find('.forward');
		this.$backward = this.$el.find('.backward');

		//window keydown event
		$(window).on('keydown', this.onKeyDown);

		//window scroll event
		app.on('scroll', this.onScroll);
		
		// set up a random time to show the king
		var rand = Math.random()*this.randomDelay;
		_.delay(this.showKing, rand);

	};

	// Events
	View.events = { };

	// Show the king
	View.showKing = function() {
		this.isActive = true;

		// set random initial Y position
		var y = Math.floor(Math.random()*(this.maxY-this.minY+1)+this.minY);

		this.$el.css('top', y);

		// start render loop
		tram.frame(this.renderLoop);

	};

	// If a king is gone, then call start New King to delay a new King
	View.startNewKing = function() {

		// reset all the properties
		this.dir = 'forward';
		this.$el.css('left', '-77px');
		this.$forward.css('display', 'block');
		this.$backward.css('display', 'none');
		this.vertical = 'none';
		this.speed = 1;

		var rand = Math.random()*this.randomDelay;
		_.delay(this.showKing, rand);

	};

	// Event on key down, is arrow key?
	View.onKeyDown = function(e) {
		if(e.keyCode < 37 || e.keyCode > 40 || !this.isActive) return;
		e.preventDefault();

		// move the king in the direction you pressed
		if(e.keyCode == 39) {
			this.dir = 'forward';
			this.vertical = 'none';
			this.$forward.css('display', 'block');
			this.$backward.css('display', 'none');
		} else if(e.keyCode == 37) {
			this.dir = 'backward';
			this.vertical = 'none';
			this.$forward.css('display', 'none');
			this.$backward.css('display', 'block');
		} else if(e.keyCode == 38) {
			this.vertical = 'up';
		} else if(e.keyCode == 40) {
			this.vertical = 'down';
		}
	};

	// Scroll Event (to set the minY and maxY values)
	View.onScroll = function(e) {
		this.minY = $(window).scrollTop();
		this.maxY = $(window).height() + this.minY;
	};

	// render loop for more performant drawing updates
	View.renderLoop = function() {

		// If the king isn't active, then get out
		if(!this.isActive) {
			this.startNewKing();
			return;
		}

		// render loop
		tram.frame(this.renderLoop);

		// set the left/right values here
		var curLeft = parseFloat(this.$el.css('left'));
		var newLeft;

		// check for vals to stop this thing
		if(curLeft < -77 || curLeft > $(window).width() + 77) this.isActive = false;

		if(this.dir == 'forward') newLeft = curLeft+this.speed;
		else newLeft = curLeft-this.speed;
		this.$el.css('left', newLeft);

		// Up and down movements here
		var curTop = parseFloat(this.$el.css('top'));
		var newTop;

		if(curTop < this.minY - 77 || curTop > this.maxY + 77) this.isActive = false;

		if(this.vertical == 'up') newTop = curTop-this.speed;
		else if(this.vertical == 'down') newTop = curTop+this.speed;
		else newTop = curTop;
		this.$el.css('top', newTop);

	};

	

	
	// Return the view
	return Backbone.View.extend(View);
	
});