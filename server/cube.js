var _ = require('underscore');
var colors = require('colors/safe');
var randomstring = require('randomstring');

colors.setTheme({
  y: ['yellow', 'bold'],
  w: ['white', 'bold'],
  r: ['red', 'bold'],
  o: ['magenta', 'bold'],
  b: ['blue', 'bold'],
  g: ['green', 'bold'],
});

module.exports = function Cube(copyFaces) {
  
  faces = {};
  if(copyFaces) {
    for (copyF in copyFaces) {
      faces[copyF] = JSON.parse(JSON.stringify(copyFaces[copyF]));
    }
  }

  return {

    faces: faces,

    turnTrack: [],

    sides: {
      y: {
        name: 'y',
        north: 'r',
        south: 'o',
        east: 'b',
        west: 'g'
      },
      w: {
        name: 'w',
        north: 'b',
        south: 'g',
        east: 'r',
        west: 'o'
      },
      r: {
        name: 'r',
        north: 'y',
        south: 'w',
        east: 'g',
        west: 'b'
      },
      o: {
        name: 'o',
        north: 'g',
        south: 'b',
        east: 'y',
        west: 'w'
      },
      g: {
        name: 'g',
        north: 'o',
        south: 'r',
        east: 'w',
        west: 'y'
      },
      b: {
        name: 'b',
        north: 'w',
        south: 'y',
        east: 'o',
        west: 'r'
      }
    },

    getFace: function(face) {
      return this.faces[face];
    },
    getFaceString: function(face) {
      return _.flatten(this.getFace(face)).join('');
    },
    getString: function() {
      var s = '';
      for (f in this.faces) {
        s += this.getFaceString(f);
      }
      return s;
    },

    getCol: function(face, dir, faces) {
      if(!faces) {
        faces = this.faces
      }
      switch(dir) {
        case 'east':
          return this.getEast(face, faces);
        case 'west':
          return this.getWest(face, faces);
        case 'north':
          return this.getNorth(face, faces);
        case 'south':
          return this.getSouth(face, faces);
      }
    },

    getNorth: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return faces[face][0];
    },
    getCenterHorizontal: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return faces[face][1];
    },
    getSouth: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return faces[face][2];
    },
    getWest: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return [faces[face][0][0], faces[face][1][0], faces[face][2][0]];
    },
    getCenterVertical: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return [faces[face][0][1], faces[face][1][1], faces[face][2][1]];
    },
    getEast: function(face, faces) {
      if(!faces) {
        faces = this.faces
      }
      return [faces[face][0][2], faces[face][1][2], faces[face][2][2]];
    },

    setNorth: function(face, vals) {
      var stash = this.getNorth(face);
      this.faces[face][0] = vals;
      return stash;
    },
    setSouth: function(face, vals) {
      var stash = this.getSouth(face);
      this.faces[face][2] = vals;
      return stash;
    },
    setWest: function(face, vals) {
      var stash = this.getEast(face);
      this.faces[face][0][0] = vals[0];
      this.faces[face][1][0] = vals[1];
      this.faces[face][2][0] = vals[2];
      return stash;
    },
    setEast: function(face, vals) {
      var stash = this.getWest(face);
      this.faces[face][0][2] = vals[0];
      this.faces[face][1][2] = vals[1];
      this.faces[face][2][2] = vals[2];
      return stash;
    },

    change: function(face, direction, vals) {
      vals = vals.slice().reverse();
      switch(direction) {
        case 'east':
          return this.setEast(face, vals);
        case 'west':
          return this.setWest(face, vals);
        case 'north':
          return this.setNorth(face, vals);
        case 'south':
          return this.setSouth(face, vals);
      }
    },

    rotate: function(face) {
      var f = this.faces[face];
      var newFace = [
        [f[2][0], f[1][0], f[0][0]],
        [f[2][1], f[1][1], f[0][1]],
        [f[2][2], f[1][2], f[0][2]]
      ];
      this.faces[face] = newFace;
    },

    turn: function(face, number, print) {
      this.turnTrack.push(face);
      if(!number) number = 1;
      if(face.indexOf('\'') > -1) {
        face = face.substring(0, 1);
        number = 3;
      }

      for(var i=0; i<number; i++) {
        var stash = JSON.parse(JSON.stringify(this.faces));
        var side = this.sides[face];
        var north = this.sides[side.north];
        var south = this.sides[side.south];
        var east = this.sides[side.east];
        var west = this.sides[side.west];

        // FOR ALL POSSIBLE TURNS OF YELLOW
        // Turn yellow by red - set (north) of it's (north) to be (west) of it's (west) nnww
        // Turn yellow by green - set (west) of it's (west) to be (east) of it's (south) wwes
        // Turn yellow by orange - set (south) of it's (east) to be (north) of it's (north) senn
        // Turn yellow by blue - set (east) of it's (south) to be (south) of it's (east)    esse

        // FOR ALL MOVES ON ONE YELLOW TURN
        // Turn red by yellow - set (N) of it's (N) to be (W) of it's (W) R
        // Turn blue by yellow - set (S) of it's (E) to be (N) of it's (N) R
        // Turn orange by yellow - set (E) of it's (S) to be (S) of it's (E) R
        // Turn green by yellow - set (W) of it's (W) to be (E) of it's (S) 
        // Rotate yellow

        this.change(north.name, 'north', this.getCol(west.name, 'west', stash));
        this.change(east.name, 'south', this.getCol(north.name, 'north', stash));
        this.change(south.name, 'east', this.getCol(east.name, 'south', stash));
        this.change(west.name, 'west', this.getCol(south.name, 'east', stash));

        this.rotate(side.name);
      }

      if(print) {
        this.toString();
      }
    },

    scramble: function() {
      var turns = randomstring.generate({
        charset: Object.keys(this.sides).join(''),
        length: 40
      });
      for (var i = 0, len = turns.length; i < len; i++) {
        this.turn(turns[i]);
      }
    },

    isCrossSolved: function(f) {
      var s = this.getString();
      var side = this.sides[f];
      return s[10]+s[12]+s[14]+s[16]+s[25]+s[30]+s[41]+s[46] == side.name+side.name+side.name+side.name+side.east+side.west+side.south+side.north
    },

    isSolved: function() {
      var solved = '';
      for(side in this.sides) {
        for(i=0; i<6;i++) {
          solved+= side;
        }
      }
      return this.getString() === solved;
    },

    isSpinning: function() {
      var last4 = this.turnTrack.slice(-5);
      if(last4.length == 5) {
        return last4.every( (val, i, arr) => val == last4[0] );
      }
      return false;
    },

    reset: function(numbers) {
      for(side in this.sides){
        var face = this.sides[side];
        var colour = face.name;
        if(numbers) {
          this.faces[face.name] = [[colour+1, colour+2, colour+3], [colour+4, colour+5, colour+6], [colour+7, colour+8, colour+9]];
        } else {
          this.faces[face.name] = [[colour, colour, colour], [colour, colour, colour], [colour, colour, colour]];
        }
      };
    },

    findEdgePiece: function(c2, c1) {
      for(f in this.faces) {
        var face = this.faces[f];
        for(var x=0; x<face.length; x++) {
          for(var y=0; y<face[x].length; y++) {
            if(face[x][y] == c2) {
              var side = this.sides[f];
              var adjacent, dir;

              if(x==1 && y==0) {
                // Left center
                dir = 'west';
                var west = this.sides[side[dir]];
                adjacent = this.getCol(west.name, 'west')[1];
              } else if(x==0 && y==1) {
                // Top center
                dir = 'north';
                var north = this.sides[side[dir]];
                adjacent = this.getCol(north.name, 'north')[1];
              } else if(x==2 && y==1) {
                // Bottom center
                dir = 'south';
                var south = this.sides[side[dir]];
                adjacent = this.getCol(south.name, 'east')[1];
              } else if(x==1 && y==2) {
                // right center
                dir = 'east';
                var east = this.sides[side[dir]];
                adjacent = this.getCol(east.name, 'south')[1];
              }

              if(adjacent == c1) {
                return {f:f, x:x, y:y, dir: dir}
              }
            }
          }
        }
      }
      console.log('Couldont find',c1, c2);
      this.toString();
    },

    toString: function() {
      console.log('                          ||===|===|===||');
      for(var i=this.faces.y.length-1; i>-1; i--) {
        if(i!=this.faces.y.length-1){
          console.log('                          ||---|---|---||');
        }
        var arr1 = this.faces.y[i].slice().reverse()
        console.log('                          ||',
          colors[arr1[0]](arr1[0]), '|',
          colors[arr1[1]](arr1[1]), '|',
          colors[arr1[2]](arr1[2]),
          '||');
      }
      

      var longString = '';
      console.log('||===|===|===||===|===|===||===|===|===||===|===|===||');
      arr1 = this.getEast('o');
      var arr2 = this.getSouth('b').slice().reverse();
      var arr3 = this.getNorth('r');
      var arr4 = this.getWest('g').slice().reverse();
      console.log('||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]), '||',
        colors[arr2[0]](arr2[0]), '|',
        colors[arr2[1]](arr2[1]), '|',
        colors[arr2[2]](arr2[2]), '||',
        colors[arr3[0]](arr3[0]), '|',
        colors[arr3[1]](arr3[1]), '|',
        colors[arr3[2]](arr3[2]), '||',
        colors[arr4[0]](arr4[0]), '|',
        colors[arr4[1]](arr4[1]), '|',
        colors[arr4[2]](arr4[2]), '||'
      );

      console.log('||---|---|---||---|---|---||---|---|---||---|---|---||');
      arr1 = this.getCenterVertical('o');
      arr2 = this.getCenterHorizontal('b').slice().reverse();
      arr3 = this.getCenterHorizontal('r');
      arr4 = this.getCenterVertical('g').slice().reverse();
      console.log('||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]), '||',
        colors[arr2[0]](arr2[0]), '|',
        colors[arr2[1]](arr2[1]), '|',
        colors[arr2[2]](arr2[2]), '||',
        colors[arr3[0]](arr3[0]), '|',
        colors[arr3[1]](arr3[1]), '|',
        colors[arr3[2]](arr3[2]), '||',
        colors[arr4[0]](arr4[0]), '|',
        colors[arr4[1]](arr4[1]), '|',
        colors[arr4[2]](arr4[2]), '||'
      );

      console.log('||---|---|---||---|---|---||---|---|---||---|---|---||');
      arr1 = this.getWest('o');
      arr2 = this.getNorth('b').slice().reverse();
      arr3 = this.getSouth('r');
      arr4 = this.getEast('g').slice().reverse();
      console.log('||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]), '||',
        colors[arr2[0]](arr2[0]), '|',
        colors[arr2[1]](arr2[1]), '|',
        colors[arr2[2]](arr2[2]), '||',
        colors[arr3[0]](arr3[0]), '|',
        colors[arr3[1]](arr3[1]), '|',
        colors[arr3[2]](arr3[2]), '||',
        colors[arr4[0]](arr4[0]), '|',
        colors[arr4[1]](arr4[1]), '|',
        colors[arr4[2]](arr4[2]), '||'
      );

      console.log('||===|===|===||===|===|===||===|===|===||===|===|===||');
      arr1 = this.getEast('w');
      console.log('                          ||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]),
        '||');
      console.log('                          ||---|---|---||');
      arr1 = this.getCenterVertical('w');
      console.log('                          ||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]),
        '||');
      console.log('                          ||---|---|---||');
      arr1 = this.getWest('w');
      console.log('                          ||',
        colors[arr1[0]](arr1[0]), '|',
        colors[arr1[1]](arr1[1]), '|',
        colors[arr1[2]](arr1[2]),
        '||');
      console.log('                          ||===|===|===||');
    }
  }

}
/*
                        |---|---|---|
                        | ▼ | ▼ | ▼ |
                        |---|---|---|
                        | ▼ | ▼ | ▼ |
                        |---|---|---|
                        | ▼ | ▼ | ▼ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ◄ | ◄ | ◄ | ▼ | ▼ | ▼ | ▲ | ▲ | ▲ | ► | ► | ► |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ◄ | ◄ | ◄ | ▼ | ▼ | ▼ | ▲ | ▲ | ▲ | ► | ► | ► |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ◄ | ◄ | ◄ | ▼ | ▼ | ▼ | ▲ | ▲ | ▲ | ► | ► | ► |
|---|---|---|---|---|---|---|---|---|---|---|---|
                        | ◄ | ◄ | ◄ |
                        |---|---|---|
                        | ◄ | ◄ | ◄ |
                        |---|---|---|
                        | ◄ | ◄ | ◄ |
                        |---|---|---|

                        |---|---|---|
                        | y | y | y |
                        |---|---|---|
                        | y | y | y |
                        |---|---|---|
                        | y | y | y |
|---|---|---|---|---|---|---|---|---|---|---|---|
| o | o | o | b | b | b | r | r | r | g | g | g |
|---|---|---|---|---|---|---|---|---|---|---|---|
| o | o | o | b | b | b | r | r | r | g | g | g |
|---|---|---|---|---|---|---|---|---|---|---|---|
| o | o | o | b | b | b | r | r | r | g | g | g |
|---|---|---|---|---|---|---|---|---|---|---|---|
                        | w | w | w |
                        |---|---|---|
                        | w | w | w |
                        |---|---|---|
                        | w | w | w |
                        |---|---|---|


*/
