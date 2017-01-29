var assert = require('assert');
var Cube = require('../server/cube');

describe('Cube', function() {

  context('turning', function() {

    var cube;

    beforeEach(function() {
      cube = new Cube();
      cube.getSolvedCube();
    });

    describe('single face turns', function() {
      it('yellow', function() {
        cube.turn('y');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'gggrrrrrr');
        assert.equal(cube.getFaceString('o'), 'oobooboob');
        assert.equal(cube.getFaceString('g'), 'oggoggogg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbrrr');
      });

      it('white', function() {
        cube.turn('w');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'rrrrrrbbb');
        assert.equal(cube.getFaceString('o'), 'googoogoo');
        assert.equal(cube.getFaceString('g'), 'ggrggrggr');
        assert.equal(cube.getFaceString('b'), 'ooobbbbbb');
      });

      it('red', function() {
        cube.turn('r');
        assert.equal(cube.getFaceString('y'), 'bbbyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwgwwgwwg');
        assert.equal(cube.getFaceString('r'), 'rrrrrrrrr');
        assert.equal(cube.getFaceString('o'), 'ooooooooo');
        assert.equal(cube.getFaceString('g'), 'ggggggyyy');
        assert.equal(cube.getFaceString('b'), 'wbbwbbwbb');
      });

      it('orange', function() {
        cube.turn('o');
        assert.equal(cube.getFaceString('y'), 'yyyyyyggg');
        assert.equal(cube.getFaceString('w'), 'bwwbwwbww');
        assert.equal(cube.getFaceString('r'), 'rrrrrrrrr');
        assert.equal(cube.getFaceString('o'), 'ooooooooo');
        assert.equal(cube.getFaceString('g'), 'wwwgggggg');
        assert.equal(cube.getFaceString('b'), 'bbybbybby');
      });

      it('green', function() {
        cube.turn('g');
        assert.equal(cube.getFaceString('y'), 'ryyryyryy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwooo');
        assert.equal(cube.getFaceString('r'), 'rrwrrwrrw');
        assert.equal(cube.getFaceString('o'), 'yyyoooooo');
        assert.equal(cube.getFaceString('g'), 'ggggggggg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbbbb');
      });

      it('blue', function() {
        cube.turn('b');
        assert.equal(cube.getFaceString('y'), 'yyoyyoyyo');
        assert.equal(cube.getFaceString('w'), 'rrrwwwwww');
        assert.equal(cube.getFaceString('r'), 'yrryrryrr');
        assert.equal(cube.getFaceString('o'), 'oooooowww');
        assert.equal(cube.getFaceString('g'), 'ggggggggg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbbbb');
      });
    });

    describe('double face turns', function() {
      it('yellow', function() {
        cube.turn('y');
        cube.turn('y');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'ooorrrrrr');
        assert.equal(cube.getFaceString('o'), 'oorooroor');
        assert.equal(cube.getFaceString('g'), 'bggbggbgg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbggg');
      });
    });

    describe('triple face turns', function() {
      it('yellow', function() {
        cube.turn('y');
        cube.turn('y');
        cube.turn('y');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'bbbrrrrrr');
        assert.equal(cube.getFaceString('o'), 'oogoogoog');
        assert.equal(cube.getFaceString('g'), 'rggrggrgg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbooo');
      });
    });

    describe('quadruple face turns', function() {
      it('yellow', function() {
        cube.turn('y');
        cube.turn('y');
        cube.turn('y');
        cube.turn('y');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'rrrrrrrrr');
        assert.equal(cube.getFaceString('o'), 'ooooooooo');
        assert.equal(cube.getFaceString('g'), 'ggggggggg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbbbb');
      });
    });

    describe('double multi-face turns', function(){
      it('yellow red', function() {
        cube.turn('y');
        cube.turn('r');
        assert.equal(cube.getFaceString('y'), 'rbbyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwgwwgwwo');
        assert.equal(cube.getFaceString('r'), 'rrgrrgrrg');
        assert.equal(cube.getFaceString('o'), 'oobooboob');
        assert.equal(cube.getFaceString('g'), 'oggoggyyy');
        assert.equal(cube.getFaceString('b'), 'wbbwbbwrr');
      });
    });

    describe('multi multi-face turns', function(){
      it('yellow red', function() {
        cube.turn('y');
        cube.turn('r');
        cube.turn('w');
        cube.turn('r');
        cube.turn('g');

        assert.equal(cube.getFaceString('y'), 'gworyyryy');
        assert.equal(cube.getFaceString('w'), 'wwrwwyboy');
        assert.equal(cube.getFaceString('r'), 'brybrgwgo');
        assert.equal(cube.getFaceString('o'), 'yywgobgob');
        assert.equal(cube.getFaceString('g'), 'boobggrrg');
        assert.equal(cube.getFaceString('b'), 'goowbbwrr');
      });
    });

  });
});