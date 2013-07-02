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
		val: null,
		selection: null,
		isRightSelect: false
	};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$input = this.$('input');
		this.$select = this.$('select');

		//set up the initial value and selection
		this.val = this.$input.val();
		this.selection = this.$select.find(':selected').text();

		app.on('updateValues', this.onUpdate);

		// call an initial update, to set the other module
		// ONLY happens in this module, we don't want to call 2 updates at the same time
		//this.update();
	};

	// Events
	View.events = {
		'keyup input': 'onInputChange',
		'change select': 'onSelectChange'
	};

	// Update this input based on some change elsewhere
	View.onUpdate = function(params) {

		// don't act on the one that's being selected
		if(params.source === this) return;
		
		// Deal with the RIGHT only 
		if(params.isRightSelect) {
			var left = this,
				right = params.source;

			var toConvert = left.val + ' ' + left.selection.toLowerCase(),
				selection = right.selection.substring(0, right.selection.length - 1).toLowerCase(),
				newOutput = katamari(toConvert, selection, {output: 'object'});

			// school bus exception
			if(selection == 'school buse') selection = selection.substring(0, selection.length-1);

			right.$input.val(newOutput.value);
			right.val = right.$input.val();

			// reset isRightSelect to false
			right.isRightSelect = false;

			return;
		}	

		// if we have a 0, then make sure the other one is zero'd out
		if(params.val == 0) {
			this.$input.val('0');
			this.val = this.$input.val();
			return;
		}

		var toConvert = params.val + ' ' + params.selection.toLowerCase(),
			selection = this.selection.substring(0, this.selection.length - 1).toLowerCase(),
			newOutput = katamari(toConvert, selection, {output: 'object'});

		// deal with school buses here
		if(selection == 'school buse') selection = selection.substring(0, selection.length-1);

		this.$input.val(newOutput.value);
		this.val = this.$input.val();
	};

	// On Change of the input area
	View.onInputChange = function(e) {
		// if the val is not a number, then do nothing
		if(!$.isNumeric(this.$input.val())) return;
		this.val = this.$input.val();
		this.update();
	};

	// On Change of the select area
	View.onSelectChange = function(e) {
		this.selection = this.$select.find(':selected').text();

		if(this.$el.hasClass('katamari')) this.isRightSelect = true;
		else this.isRightSelect = false;

		this.update();
	};

	View.update = function() {
		app.trigger('updateValues', {
			source: this,
			val: this.val,
			selection: this.selection,
			isRightSelect: this.isRightSelect
		});
	};

	// Return the view
	return Backbone.View.extend(View);
	
});