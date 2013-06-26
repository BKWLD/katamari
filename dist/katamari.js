/**
* A utility to convert distances into terms more easily parsed by humans
* 
* @author Robert Reinhard, BKWLD
* @author Matt Aebersold, BKWLD
* @license MIT 
**/

// Wrapper.js will expose this function for AMD, CJS, and DOM
function _katamari() {
	
	// Default settings
	var defaults = {
		precision: 1,
		output: 'string'
	};
	
	// Conversions
	var units = {
		
		// Normal
		meter: 1,
		kilometer: 1000,
		mile: 1609.34,
		
		// Fun
		'garden gnome': 0.127, // 5 inches, http://cl.ly/2G3S1L1h243M
		'bicycle': 1.778, // 70 inches, http://cl.ly/0l420h0r2E41
		'elephant': 7, // http://cl.ly/171O1h0K1K34
		'school bus': { 
			ratio: 11.2776, // 37 feet, http://cl.ly/3K0G1Q2K2a1o
			plural: 'school buses' }, 
		'dragon': 40, // Dragon riders of Pern dragons, http://cl.ly/2f1H0H1p0s2G
		'roman colosseum': 189, // http://cl.ly/3M2c0N162L2D
		'starship enterprise': 641, // Picard's entperise, duh http://cl.ly/0R1Q1S0L2B3z
		'golden gate bridge': 2737 // http://cl.ly/1X0L1a2R120m
	};
	
	// Aliases
	var aliases = {
		m: 'meter',
		km: 'kilometer'
	};
	
	// Scales
	var scales = {
		'default': ['garden gnome', 'bicycle', 'elephant', 'dragon', 'roman colosseum', 'starship enterprise', 'golden gate bridge']
	};
	
	// Add plural options to the aliases list for quicker lookups
	var unit;
	for (unit in units) {
		if (typeof units[unit] != 'object') continue;
		else if (units[unit].hasOwnProperty('plural')) aliases[units[unit].plural] = unit;
	}
	
	// Result a unit name since plurals are allowed
	function resolveUnit(format) {
		if (units.hasOwnProperty(format)) return format;
		
		// Try making a singular version
		if (format.substr(-1) == 's') {
			var singular = format.substr(0, format.length-1);
			if (units.hasOwnProperty(singular)) return singular;
		}
		
		// Check for the format as a plural or alias property
		if (aliases.hasOwnProperty(format)) return aliases[format];
	}
	
	// Get the raio from a unit
	function unitRatio(format) {
		if (typeof units[format] == 'number') return units[format];
		else return units[format].ratio;
	}
	
	// Determine ratio
	function findRatio(format, distance, options) {

		// If the output format is not a scale, just return it's ratio directly
		if (!scales.hasOwnProperty(format)) return format;
				
		// Otherwise, move up the scale until we produce a conversion of < 2, 
		// then return the previous value
		var i, ratio, last_ratio, scale = scales[format];
		for (i=0; i<scale.length; i++) {
			ratio = unitRatio(scale[i]);
			if (i===0 && distance/ratio < 2) return scale[0];
			else if (distance/ratio < 2) return scale[i-1];
			last_ratio = ratio;
		} 
		
		// We got to the last item in the scale, use it
		return scale[scale.length-1];
		
	}
	
	// Handle plurarilty
	function plural(format) {
		if (typeof units[format] == 'object' && units[format].hasOwnProperty('plural')) return units[format].plural;
		else return format+'s';
	}
	
	// Return conversion function
	return function(input, output_format, options) {
		
		// Set default options
		if (!options) options = defaults;
		else if (typeof options == 'object') {
			for (var option in defaults) {
				if (!options.hasOwnProperty(option)) options[option] = defaults[option];
			}
		}
		
		// Validate input and set defaults
		var matches = String(input).match(/^([\d.]+) *(.*)$/i);
		var distance = parseFloat(matches[1]);
		if (!distance) return false;
		var input_format = matches[2];
		if (!input_format) input_format = 'meter';
		if (!(input_format = resolveUnit(input_format))) return false;
		
		// Validate output formats
		if (!output_format) output_format = 'default';
		if (!(scales.hasOwnProperty(output_format) || (output_format = resolveUnit(output_format)))) return false;
		
		// Determine ratios and convert
		var in_ratio = unitRatio(input_format);
		distance *= in_ratio;
		output_format = findRatio(output_format, distance);
		distance /= unitRatio(output_format);
		
		// Produce output
		var places = Math.pow(10, options.precision);
		distance = Math.round(distance*places)/places;
		switch(options.output) {
			case 'string':
				return distance+' '+(distance === 1 ? output_format : plural(output_format));
			case 'number':
				return distance;
			case 'object':
			return {
				value: distance,
				unit: output_format,
				pluralled: (distance === 1 ? output_format : plural(output_format))
			};
		}
	};
};

// Expose module via AMD, CJS, or to window via as described here:
// http://daffl.github.io/2012/02/22/javascript-modules.html
(function(namespace) {
	if(typeof define == "undefined") {
		define = function(fn) {
			var res = fn();
			if(typeof exports == "undefined") {
				window[namespace] = res;
			} else {
				module.exports = res;
			}
		};
	}
	
	define(function() {
		return _katamari();
	});
})('katamari');