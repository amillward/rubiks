var prompt = require('prompt');
var Cube = require('./cube');
var Solver = require('./solver');

var myCube = new Cube();
myCube.reset();
myCube.toString();

prompt.start();

var commands = {
  y: 'y',
  w: 'w',
  r: 'r',
  o: 'o',
  g: 'g',
  b: 'b',
  // u: 'y',
  // d: 'w',
  // f: 'r',
  // b: 'o',
  // l: 'b',
  // r: 'g',
  // 'u\'': 'y\'',
  // 'd\'': 'w\'',
  // 'l\'': 'b\'',
  // 'r\'': 'g\'',
  // 'f\'': 'r\'',
  // 'b\'': 'o\'',
  'y\'': 'y\'',
  'w\'': 'w\'',
  'b\'': 'b\'',
  'g\'': 'g\'',
  'r\'': 'r\'',
  'o\'': 'o\'',
  help: 'help',
  h: 'help',
  scramble: 'scramble',
  shuffle: 'scramble',
  s: 'scramble',
  print: 'print',
  p: 'print',
  solve: 'solve',
  cross: 'cross',
  c: 'cross'
}

var doTurn = function() {
  prompt.get('turn', function(err, result) {

    switch(commands[result.turn]) {
      case 'y':
      case 'w':
      case 'r':
      case 'o':
      case 'b':
      case 'g':
        myCube.turn(commands[result.turn]);
        break;

      case 'y\'':
      case 'w\'':
      case 'r\'':
      case 'o\'':
      case 'g\'':
      case 'b\'':
        var face = commands[commands[result.turn].charAt(0)];
        myCube.turn(face);
        myCube.turn(face);
        myCube.turn(face);
        break;

      case 'scramble':
        myCube.scramble();
        break;

      case 'print':
        break;

      case 'reset':
        myCube.reset();
        break;

      case 'solve':
        solver = new Solver();
        solver.solve(myCube);
        break;

      case 'help':
        console.log('Commands:', Object.keys(commands).join(', '));
        return doTurn()

      default:
        return prompt.get('quit', function(err, result){
          if(result.quit == 'n'){
            return doTurn();
          } 
        });
    }
    myCube.toString();
    return doTurn();
  });
}
doTurn();
