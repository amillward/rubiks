var Cube = require('./cube');
module.exports = function Solver() {

  return {
    solve: function(cube) {
      cube.turnTrack = [];
      var count = 0;
      while(count<20 && !cube.isSolved()) {
        cube.toString();
        var points = this.scoreTurns(cube, 'w');
        var lowest = 999999;
        var turn;
        for(point in points) {
          if(points[point]<lowest) {
            lowest = points[point];
            turn = point;
          }
        }
        console.log(points);
        console.log('turn', turn);
        if(turn.indexOf('p') > -1) {
          turn = turn.substring(0, 1);
          cube.turn(turn);
          cube.turn(turn);
        }
        cube.turn(turn);
        count++;
      }
      console.log('Total turns:', cube.turnTrack.length, cube.turnTrack.join(','));
      // this.solveCross(cube, 'w');
    },

    solveCross: function(cube, f) {
      if(!f) f = 'w'

      var face = cube.sides[f];

      cube.turnTrack = [];

      this.solveCrossEdge(cube, f, face.north);
      this.solveCrossEdge(cube, f, face.south);
      this.solveCrossEdge(cube, f, face.east);
      this.solveCrossEdge(cube, f, face.west);

      console.log('Total turns:', cube.turnTrack.length, cube.turnTrack.join(','));
    },

    getPoints: function(copyCube, c1, c2) {
      var locRW = copyCube.findEdgePiece(c2, c1);
      var locWR = copyCube.findEdgePiece(c1, c2);
      var oppositeR = copyCube.sides[copyCube.sides[c2].north].south;
      var oppositeW = copyCube.sides[copyCube.sides[c1].north].south;

      if(locWR.f == c1 && locRW.f == c2) {
        // Solved
        // Two side colour match = Already in position
        // console.log(1);
        return 0;
      } else if(locWR.f == c1 || locRW.f == c2) {
        // One side matched
        // console.log(2);
        return 3; // Align other colour
      } else {
        // Neither side is matched
        if(locWR.f == oppositeW) {
          // White facing up on top
          // console.log(3);
          return 6; // Turn top to align colour, turn colour to align white
        } else if(locRW.f == oppositeW) {
          // Color facing up on top
          if(locRW.f == locWR.f || locRW.f == oppositeW) {
            // Upward colour [matches/is opposite to] side it's white is on
            // console.log(4);
            return 7; // turn top to split colour next to it's side, Align colour to colour, align white to white
          } else {
            // console.log(5);
            return 6; // Align colour to colour, align white to white
          }
        } else if(locWR.f == c1) {
          // White facing down in bottom layer (not colour aligned)
          // console.log(6);
          return 8; // turn colour's relative face to split from white, then 3 steps from 'white in the middle'
        } else if(locRW.f == c1) {
          // Colour facing down in bottom layer (White facing out in bottom layer)
          // DO STUFF
          // console.log(7);



          return 9;
        } else {
          // White in the middle
          // console.log(8);
          return 7; // Turn the base so colour's side is on piece's colour side, turn new side down, undo first turn
        }
      }

      /*
        Two side colour match = Already in position
          0
        One side colour matching
          1 # Align other colour
        Neither sides match
          White facing up on top
            2 #(Turn top to align colour, turn colour to align white)
          Color facing up on top (White facing out on top)

            Upward colour [matches/is opposite to] side it's white is on
              3 #(turn top to split colour next to it's side, Align colour to colour, align white to white)
            else
              2 #(Align colour to colour, align white to white)

          White facing down in bottom layer (not colour aligned)
            4 #(turn colour's relative face to split from white, then 3 steps from 'white in the middle')

          White facing out in bottom layer
            Piece's colour is on adjacent face
              2 #(Turn to align colour to colour, turn colour to align whites)
            else
              3 #(Turn colour's face so white faces up, then 2 steps from 'white facing up on top')
          White in the middle (not colour aligned - that was already handled)
            3 #(Turn the base so colour's side is on piece's colour side, turn new side down, undo first turn)
      */
    },

    scoreTurns: function(cube, f) {
      var scores = {};
      for(side in cube.sides) {
        var copy = new Cube(cube.faces);
        copy.turn(side);

        var points = 0;
        points += this.getPoints(copy, 'w', 'r');
        points += this.getPoints(copy, 'w', 'g');
        points += this.getPoints(copy, 'w', 'o');
        points += this.getPoints(copy, 'w', 'b');
        scores[side] = points;

        // Prime
        copy = new Cube(cube.faces);
        copy.turn(side);
        copy.turn(side);
        copy.turn(side);

        var points = 0;
        points += this.getPoints(copy, 'w', 'r');
        points += this.getPoints(copy, 'w', 'g');
        points += this.getPoints(copy, 'w', 'o');
        points += this.getPoints(copy, 'w', 'b');
        scores[side+'p'] = points;
      }
      return scores;
    },

    solveCrossEdge: function(cube, c1, c2) {
      var locRW = cube.findEdgePiece(c2, c1);
      var locWR = cube.findEdgePiece(c1, c2);
      var oppositeR = cube.sides[cube.sides[c2].north].south;
      var oppositeW = cube.sides[cube.sides[c1].north].south;

      // There are 6 cases for the position of the edge piece in relation to it's target
      if(locWR.f == c1 && locRW.f == c2) {
        // Solved
        console.log('solved');
      } else if(locWR.f == oppositeW) {
        // Top up
        console.log('top up');

        // Turn Y to align c2 to its centre
        while(locRW.f != c2) {
          cube.turn(oppositeW);
          locRW = cube.findEdgePiece(c2, c1);
        }

        // Turn c2 twice
        cube.turn(c2);
        cube.turn(c2);

      } else if (locRW.f == oppositeW) {
        // Top out
        console.log('top out');

        // Turn y to align w to c2's face
        var east = cube.sides[cube.sides[cube.sides[c2].north].south];
        while(locWR.f != c2) {
          cube.turn(oppositeW);
          locWR = cube.findEdgePiece(c1, c2);
        }

        // Turn once more
        cube.turn(oppositeW);
        locWR = cube.findEdgePiece(c1, c2);

        var west = cube.sides[locWR.f];

        // Turn west
        cube.turn(west.name);

        // Turn c2
        cube.turn(c2);
        cube.turn(c2);
        cube.turn(c2);
        cube.turnTrack = cube.turnTrack.slice(0, cube.turnTrack.length - 2); // Until we can turn anticlockwise

        // Turn west' to repair
        cube.turn(west.name);
        cube.turn(west.name);
        cube.turn(west.name);
        cube.turnTrack = cube.turnTrack.slice(0, cube.turnTrack.length - 2); // Until we can turn anticlockwise

      } else if (locRW.f == c1) {
        // Bottom out
        console.log('bottom out');

        // Turn face of whites side twice
        cube.turn(locWR.f);
        cube.turn(locWR.f);

        // Do top out alg
        this.solveCrossEdge(cube, c1, c2);

      } else if (locWR.f == c1) {
        // Bottom down
        console.log('bottom down');

        //Turn face of c2's side twice
        cube.turn(locRW.f);
        cube.turn(locRW.f);

        // Do top-up alg
        this.solveCrossEdge(cube, c1, c2);

      } else {
        // Middle
        console.log('middle');

        // Turn c2's side so w is on face y (may be prime or not)
        var correction = locRW.f;
        var count = 0;
        while(locWR.f != oppositeW) {
          count++;
          cube.turn(locRW.f);
          locWR = cube.findEdgePiece(c1, c2);
        }

        // Turn Y to align c2 to its centre
        while(locRW.f != c2) {
          cube.turn(oppositeW);
          locRW = cube.findEdgePiece(c2, c1);
        }

        // Turn c2 twice
        cube.turn(c2);
        cube.turn(c2);

        // Unturn first face to repair
        console.log('correct', c1, correction);
        var correctionTurns = 3*count;
        correctionCount = correction % 4;
        for (var i=0; i<correctionCount; i++) {
          cube.turn(correction);
        }
      }
      console.log('turn progress:', cube.turnTrack.length, cube.turnTrack.join(','));
    }
  }
}
