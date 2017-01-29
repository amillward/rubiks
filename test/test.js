var assert = require('assert');
var Cube = require('../server/cube');

describe('Cube', function() {

  context('turning', function() {

    var cube;

    before(function() {
      // runs before all tests in this block
      cube = new Cube();
      cube.getSolvedCube();
    });

    describe('single face turns', function() {
      it('yellow', function() {
        cube.turn('y');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'gggrrrrrr');
        assert.equal(cube.getFaceString('o'), 'bbboooooo');
        assert.equal(cube.getFaceString('g'), 'ooogggggg');
        assert.equal(cube.getFaceString('b'), 'rrrbbbbbb');
      });

      it('white', function() {
        cube.turn('w');
        assert.equal(cube.getFaceString('y'), 'yyyyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwwww');
        assert.equal(cube.getFaceString('r'), 'rrrrrrbbb');
        assert.equal(cube.getFaceString('o'), 'ooooooggg');
        assert.equal(cube.getFaceString('g'), 'ggggggrrr');
        assert.equal(cube.getFaceString('b'), 'bbbbbbooo');
      });

      it('red', function() {
        cube.turn('r');
        assert.equal(cube.getFaceString('y'), 'yyyyyybbb');
        assert.equal(cube.getFaceString('w'), 'gggwwwwww');
        assert.equal(cube.getFaceString('r'), 'rrrrrrrrr');
        assert.equal(cube.getFaceString('o'), 'ooooooooo');
        assert.equal(cube.getFaceString('g'), 'yggyggygg');
        assert.equal(cube.getFaceString('b'), 'bbwbbwbbw');
      });

      it('orange', function() {
        cube.turn('o');
        assert.equal(cube.getFaceString('y'), 'gggyyyyyy');
        assert.equal(cube.getFaceString('w'), 'wwwwwwbbb');
        assert.equal(cube.getFaceString('r'), 'rrrrrrrrr');
        assert.equal(cube.getFaceString('o'), 'ooooooooo');
        assert.equal(cube.getFaceString('g'), 'ggwggwggw');
        assert.equal(cube.getFaceString('b'), 'ybbybbybb');
      });

      it('green', function() {
        cube.turn('g');
        assert.equal(cube.getFaceString('y'), 'yyryyryyr');
        assert.equal(cube.getFaceString('w'), 'wwowwowwo');
        assert.equal(cube.getFaceString('r'), 'rrwrrwrrw');
        assert.equal(cube.getFaceString('o'), 'yooyooyoo');
        assert.equal(cube.getFaceString('g'), 'ggggggggg');
        assert.equal(cube.getFaceString('b'), 'bbbbbbbbb');
      });

      it('blue', function() {
        cube.turn('b');
        assert.equal(cube.getFaceString('y'), 'oyyoyyoyy');
        assert.equal(cube.getFaceString('w'), 'rwwrwwrww');
        assert.equal(cube.getFaceString('r'), 'yrryrryrr');
        assert.equal(cube.getFaceString('o'), 'woowoowoo');
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
        assert.equal(cube.getFaceString('o'), 'rrroooooo');
        assert.equal(cube.getFaceString('g'), 'bbbgggggg');
        assert.equal(cube.getFaceString('b'), 'gggbbbbbb');
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
        assert.equal(cube.getFaceString('o'), 'gggoooooo');
        assert.equal(cube.getFaceString('g'), 'rrrgggggg');
        assert.equal(cube.getFaceString('b'), 'ooobbbbbb');
      });
    });

  });
});