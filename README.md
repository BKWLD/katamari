# Katamari.js

Being told something is 300 feet away or 50 meters or 2.4 miles can be tough to visualize.  Katamari turns distances into multiples of objects that ARE easy to visualize.  You can use it to convert one unit to another:

	katamari('1 meter', 'bicycles'); // 0.6 bicycles

Or you can let it choose an appropriate unit of measurement for you:

	katamari('1 meter'); // 7.8 garden gnomes
	
## Installation

Grab [dist/katamari.js](https://raw.github.com/BKWLD/katamari/master/dist/katamari.js) or [dist/katamari.min.js](https://raw.github.com/BKWLD/katamari/master/dist/katamari.min.js) from the repo.

#### Require.js, Node.js (AMD, CJS)

	var katamari = require('path/to/katamari.js');
	console.log(katamari('1 meter'));
	
#### In browser

	<script type="text/javascript" src="path/to/katamari.min.js"></script>
	<script>console.log(katamari('1 meter'));</script>

## Usage

#### katamari ( *mixed* input [, *string* output] [, *object* options]])

* input - If a float, it is treated as meters.  Otherwise, pass it a string using any of the units that Katamari supports.  Ex: "5.2 garden gnomes" or "1 dragon".  Both plural and non plural forms are accepted.* 
* output - If blank, uses the "default" scale (which auto selects an appropriate unit).  Otherwise, you can use any Katamari unit.* 
* options - A hash that allows any of the following pairs:
	* precision - Specify how many decimals to round to, defaults to 1.

*Supported units*

Currently, the following units:

* meter
* kilometer
* mile
* garden gnome
* bicycle
* elephant
* school bus
* dragon
* roman colosseum
* starship enterprise
* golden gate bridge

And you can also use the following as scales:

* default


I encourage folks to submit new units via pull request.