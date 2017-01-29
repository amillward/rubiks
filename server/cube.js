var _ = require('underscore');

module.exports = function Cube() {

  return {

    faces: {},

    sides: {
      y: {
        name: 'y',
        north: 'o',
        south: 'r',
        east: 'g',
        west: 'b'
      },
      w: {
        name: 'w',
        north: 'r',
        south: 'o',
        east: 'g',
        west: 'b'
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
        north: 'y',
        south: 'w',
        east: 'b',
        west: 'g'
      },
      g: {
        name: 'g',
        north: 'y',
        south: 'w',
        east: 'o',
        west: 'r'
      },
      b: {
        name: 'b',
        north: 'y',
        south: 'o',
        east: 'r',
        west: 'o'
      }
    },

    getSolvedCube: function() {
      for(side in this.sides){
        var face = this.sides[side];
        var colour = face.name;
        this.faces[face.name] = [[colour, colour, colour], [colour, colour, colour], [colour, colour, colour]];
      };
    },

    getFace: function(face) {
      return this.faces[face];
    },
    getFaceString: function(face) {
      return _.flatten(this.getFace(face)).join('');
    },

    getCol: function(face, dir) {
      switch(dir) {
        case 'east':
          return this.getWest(face);
        case 'west':
          return this.getEast(face);
        case 'north':
          return this.getNorth(face);
        case 'south':
          return this.getSouth(face);
      }
    },

    getNorth: function(face) {
      return this.faces[face][0];
    },
    getSouth: function(face) {
      return this.faces[face][2];
    },
    getEast: function(face) {
      return [this.faces[face][0][0], this.faces[face][1][0], this.faces[face][2][0]];
    },
    getWest: function(face) {
      return [this.faces[face][0][2], this.faces[face][1][2], this.faces[face][2][2]];
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
    setEast: function(face, vals) {
      var stash = this.getEast(face);
      this.faces[face][0][0] = vals[0];
      this.faces[face][1][0] = vals[1];
      this.faces[face][2][0] = vals[2];
      return stash;
    },
    setWest: function(face, vals) {
      var stash = this.getWest(face);
      this.faces[face][0][2] = vals[0];
      this.faces[face][1][2] = vals[1];
      this.faces[face][2][2] = vals[2];
      return stash;
    },

    change: function(face, direction, vals) {
      console.log('change', face, direction, vals);
      switch(direction) {
        case 'east':
          return this.setWest(face, vals);
        case 'west':
          return this.setEast(face, vals);
        case 'north':
          return this.setNorth(face, vals);
        case 'south':
          return this.setSouth(face, vals);
      }
    },

    turn: function(face) {
      console.log('\n\nTurn',face);
      var side = this.sides[face];
      var north = this.sides[side.north];
      var south = this.sides[side.south];
      var east = this.sides[side.east];
      var west = this.sides[side.west];

      // Turn yellow by red - set (south) of it's north to be east of it's west
      // Turn yellow by green - set (east) of it's north to be east of it's west
      // Turn yellow by orange - set (north) of it's north to be east of it's west
      // Turn yellow by blue - set (west) of it's north to be east of it's west

      // Change north
      var direction;
      for(dir in north) {
        if(north[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      var col;
      for(dir in side) {
        if(side[dir] == north.name) {
          col = dir;
          break;
        }
      }
      var stash1 = this.change(north.name, direction, this.getCol(west.name, col));

      // Change east

      // Turn green by red - set (west) of it's east to south of it's north
      var direction;
      for(dir in east) {
        if(east[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      var col;
      for(dir in side) {
        if(side[dir] == east.name) {
          direction = dir;
          break;
        }
      }
      var stash2 = this.change(east.name, direction, stash1);

      // Change south
      var direction;
      for(dir in south) {
        if(south[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      stash1 = this.change(south.name, direction, stash2);

      // Change west
      var direction;
      for(dir in west) {
        if(west[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      this.change(west.name, direction, stash1);

    },

    turnOld: function(face) {
      console.log('\n\nTurn',face);
      var side = this.sides[face];
      var north = this.sides[side.north];
      var south = this.sides[side.south];
      var east = this.sides[side.east];
      var west = this.sides[side.west];

      // Turn yellow by red - set (south) of it's north to be east of it's west
      // Turn yellow by green - set (east) of it's north to be east of it's west
      // Turn yellow by orange - set (north) of it's north to be east of it's west
      // Turn yellow by blue - set (west) of it's north to be east of it's west

      // Change north
      var direction;
      for(dir in north) {
        if(north[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      var stash1 = this.change(north.name, direction, this.getEast(west.name));

      // Change east

      // Turn green by red - set (west) of it's east to south of it's north
      var direction;
      for(dir in east) {
        if(east[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      var stash2 = this.change(east.name, direction, stash1);

      // Change south
      var direction;
      for(dir in south) {
        if(south[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      stash1 = this.change(south.name, direction, stash2);

      // Change west
      var direction;
      for(dir in west) {
        if(west[dir] == side.name) {
          direction = dir;
          break;
        }
      }
      this.change(west.name, direction, stash1);

    },

    toString: function() {
      for(var i=0; i<this.faces.y.length; i++) {
        console.log('                        |---|---|---|');
        console.log('                        |', this.faces.y[i].join(' | '), '|');
      }
      console.log('|---|---|---|---|---|---|---|---|---|---|---|---|');
      for(var i=0; i<3; i++){
        console.log('|',this.faces.o[i].join(' | '),'|',this.faces.b[i].join(' | '),'|',this.faces.r[i].join(' | '),'|',this.faces.g[i].join(' | '),'|');
        console.log('|---|---|---|---|---|---|---|---|---|---|---|---|');
      }
      for(var i=0; i<this.faces.w.length; i++) {
        console.log('                        |', this.faces.w[i].join(' | '), '|');
        console.log('                        |---|---|---|');
      }
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