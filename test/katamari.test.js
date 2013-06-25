/* global test:true expect:true equal:true asyncTest:true start:true ok:true */

// Test scaling
test("Default scale", function() {
  equal(katamari(1), '7.9 garden gnomes');
  equal(katamari(10), '5.6 bicycles');
  equal(katamari(50), '7.1 elephants');
  equal(katamari(100), '2.5 dragons');
  equal(katamari(1000), '5.3 roman colosseums');
  equal(katamari(5000), '7.8 starship enterprises');
  equal(katamari(10000), '3.7 golden gate bridges');
});

// Test plural support
test("Plural", function() {
  equal(katamari('1 meter', 'meter'), '1 meter');
  equal(katamari('1 meters', 'meter'), '1 meter');
  equal(katamari('1 meters', 'meters'), '1 meter');
  equal(katamari('2 meters', 'meter'), '2 meters');
  equal(katamari('1 school bus', 'school bus'), '1 school bus');
  equal(katamari('2 school buses', 'school buses'), '2 school buses');
});

// Test alias support
test("Alias", function() {
  equal(katamari('1m', 'm'), '1 meter');
  equal(katamari('1 meter', 'km'), '0 kilometers');
  equal(katamari('1 km', 'km'), '1 kilometer');
});

// Test precision
test("Precision", function() {
  equal(katamari(1, 'garden gnomes', {precision: 3}), '7.874 garden gnomes');
  equal(katamari(1, 'garden gnomes', {precision: 5}), '7.87402 garden gnomes');
});
