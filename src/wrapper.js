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