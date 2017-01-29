var _ = require('underscore');

module.exports = function Cube() {

  return {

    faces: {},

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

    getSolvedCube: function() {
      for(side in this.sides){
        var face = this.sides[side];
        var colour = face.name;
        this.faces[face.name] = [[colour, colour, colour], [colour, colour, colour], [colour, colour, colour]];
        // this.faces[face.name] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        // this.faces[face.name] = [[colour+1, colour+2, colour+3], [colour+4, colour+5, colour+6], [colour+7, colour+8, colour+9]];
      };
    },

    getFace: function(face) {
      return this.faces[face];
    },
    getFaceString: function(face) {
      return _.flatten(this.getFace(face)).join('');
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
      // console.log('Face changing:', face, 'Direction:', direction, 'to be', vals);
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

    turn: function(face) {
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
      // Turn red by yellow - set (N) of it's (N) to be (W) of it's (W) NNWW
      // Turn blue by yellow - set (S) of it's (E) to be (N) of it's (N) SENN
      // Turn orange by yellow - set (E) of it's (S) to be (S) of it's (E) ESSE
      // Turn green by yellow - set (W) of it's (W) to be (E) of it's (S) WWES
      // Rotate yellow

      this.change(north.name, 'north', this.getCol(west.name, 'west', stash).slice().reverse()); // FIXME these reverses are wrong. The reverse should be decided by the orientation of the face
      this.change(east.name, 'south', this.getCol(north.name, 'north', stash));
      this.change(south.name, 'east', this.getCol(east.name, 'south', stash).slice().reverse());
      this.change(west.name, 'west', this.getCol(south.name, 'east', stash));

      this.rotate(side.name);
    },

    toString: function() {
      var longString = '                          ||===|===|===||\n';
      for(var i=this.faces.y.length-1; i>-1; i--) {
        if(i!=this.faces.y.length-1){
          longString = longString.concat('                          ||---|---|---||\n');
        }
        longString = longString.concat('                          || ', this.faces.y[i].slice().reverse().join(' | '), ' ||\n');
      }

      longString = longString.concat('||===|===|===||===|===|===||===|===|===||===|===|===||\n');
      longString = longString.concat('|| ',this.getEast('o').join(' | '));
      longString = longString.concat(' || ',this.getSouth('b').slice().reverse().join(' | '));
      longString = longString.concat(' || ',this.getNorth('r').join(' | '));
      longString = longString.concat(' || ',this.getWest('g').slice().reverse().join(' | ') ,' ||\n');
      longString = longString.concat('||---|---|---||---|---|---||---|---|---||---|---|---||\n');

      longString = longString.concat('|| ',this.getCenterVertical('o').join(' | '));
      longString = longString.concat(' || ',this.getCenterHorizontal('b').slice().reverse().join(' | '));
      longString = longString.concat(' || ',this.getCenterHorizontal('r').join(' | '));
      longString = longString.concat(' || ',this.getCenterVertical('g').slice().reverse().join(' | ') ,' ||\n');
      longString = longString.concat('||---|---|---||---|---|---||---|---|---||---|---|---||\n');

      longString = longString.concat('|| ',this.getWest('o').join(' | '));
      longString = longString.concat(' || ',this.getNorth('b').slice().reverse().join(' | '));
      longString = longString.concat(' || ',this.getSouth('r').join(' | '));
      longString = longString.concat(' || ',this.getEast('g').slice().reverse().join(' | ') ,' ||\n');
      longString = longString.concat('||===|===|===||===|===|===||===|===|===||===|===|===||\n');

      longString = longString.concat('                          || ', this.getEast('w').join(' | '), ' ||\n');
      longString = longString.concat('                          ||---|---|---||\n');
      longString = longString.concat('                          || ', this.getCenterVertical('w').join(' | '), ' ||\n');
      longString = longString.concat('                          ||---|---|---||\n');
      longString = longString.concat('                          || ', this.getWest('w').join(' | '), ' ||\n');
      longString = longString.concat('                          ||===|===|===||\n');

      console.log(longString);
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