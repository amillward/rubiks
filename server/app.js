var prompt = require('prompt');
var Cube = require('./cube');

var myCube = new Cube();
myCube.getSolvedCube();
myCube.toString();

prompt.start();

var doTurn = function() {
  prompt.get('turn', function(err, result) {
    if(myCube.sides[result.turn]) {
      myCube.turn(result.turn);
      myCube.toString();
      doTurn();
    }
  })
}
doTurn();