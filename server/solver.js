var Cube = require('./cube');
module.exports = function Solver() {

  return {
    solve: function(cube) {
      cube.turnTrack = [];
      this.solveCross(cube, 'w');
      console.log('Total turns:', cube.turnTrack.length, cube.turnTrack.join(','));
    },

    solveCross: function(cube, side) {
      if(!cube.isSolved()) {
        var count = 0;
        if(!side) side = 'w';
        while(!cube.isCrossSolved(side) && !cube.isSpinning()) {
          var points = this.scoreTurns(cube, side);
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
          cube.turn(turn);
          count++;
        }
      }
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
      var face = cube.sides[f];
      var copy;
      for(side in cube.sides) {
        copy = new Cube(cube.faces);
        copy.turn(side);

        var points = 0;
        points += this.getPoints(copy, face.name, face.north);
        points += this.getPoints(copy, face.name, face.south);
        points += this.getPoints(copy, face.name, face.east);
        points += this.getPoints(copy, face.name, face.west);
        scores[side] = points;

        // Prime
        copy = new Cube(cube.faces);
        copy.turn(side+'\'');

        var points = 0;
        points += this.getPoints(copy, face.name, face.north);
        points += this.getPoints(copy, face.name, face.south);
        points += this.getPoints(copy, face.name, face.east);
        points += this.getPoints(copy, face.name, face.west);
        scores[side+'\''] = points;
      }
      return scores;
    }
  }
}
