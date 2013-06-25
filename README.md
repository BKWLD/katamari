# Katamari.js

Being told something is 300 feet away or 50 meters or 2.4 miles can be tough to visualize.  Katamari turns distances into multiples of objects that ARE easy to visualize.  You can use it to convert one unit to another:

	katamari('1 meter', 'bicycles'); // 0.6 bicycles

Or you can let it choose an appropriate unit of measurement for you:

	katamari('1 meter'); // 7.8 garden gnomes
	
## Installation

Grab dist/katamari.js or dist/katamari.min.js from the repo.

#### Require.js, Node.js (AMD, CJS)

	var katamari = require('path/to/katamari.js');
	console.log(katamari('1 meter'));
	
#### CJS (node.js)

	<script type="text/javascript" src="path/to/katamari.min.js"></script>
	<script>console.log(katamari('1 meter'));</script>

## Usage

TODO