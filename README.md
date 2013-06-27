# Katamari.js

Being told something is 300 feet away or 50 meters or 2.4 miles can be tough to visualize.  Katamari turns distances into multiples of objects that ARE easy to visualize.  You can use it to convert one unit to another:

	katamari('1 meter', 'bicycles'); // "0.6 bicycles"

Or you can let it choose an appropriate unit of measurement for you:

	katamari('1 meter'); // "7.8 garden gnomes"
	
You can pass a hash of options to tweak the output:

	katamari('0.02km', 'default', {precision: 3, output: 'object'}); // {value: 2.857, unit: "elephant", pluralled: "elephants"}

## Installation

Grab [dist/katamari.js](https://raw.github.com/BKWLD/katamari/master/dist/katamari.js) or [dist/katamari.min.js](https://raw.github.com/BKWLD/katamari/master/dist/katamari.min.js) from the repo.

#### Require.js, Node.js (AMD, CJS)

	var katamari = require('path/to/katamari.js');
	console.log(katamari('1 meter'));
	
#### In browser

	<script type="text/javascript" src="path/to/katamari.min.js"></script>
	<script>console.log(katamari('1 meter'));</script>

## Usage

#### katamari ( *mixed* input [, *string* format] [, *object* options]])

* input - The input distance. If a float, it is treated as meters.  Otherwise, pass it a string using any of the units that Katamari supports.  Ex: "5.2 garden gnomes" or "1 dragon".  Both plural and non plural forms are accepted.* 
* format - The output format. If blank, uses the "default" scale (which auto selects an appropriate unit).  Otherwise, you can use any Katamari unit.* 
* options - A hash that allows any of the following pairs:
	* precision - Specify how many decimals to round to, defaults to 1.
	* output - How to return the converted input.  The default is "string" which returns a response like `14.2 meters`.  Set to "number" to return just the value (ex: `14.2`); this wouldn't make sense if you set the format to a scale.  Or, set to "object" to return a hash that looks like `{value:14.2, unit:'meter', pluralled:'meters'}`.

*Supported units*

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

## Contribute

I encourage folks to submit new units (or whatever) via pull request.  Make sure to run the unit tests or add to them as appropriate.  To run the tests and build the dist version of Katamari:

1. Install npm and run `npm install`
2. Install [grunt globally](http://gruntjs.com/getting-started#installing-the-cli)
3. Run `grunt test` from the repo directory
