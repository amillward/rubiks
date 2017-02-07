module.exports = function Solver() {

  return {
    solve: function(cube) {
      this.solveCross(cube, 'w');
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

        var west = this.sides[locWR.f];

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
