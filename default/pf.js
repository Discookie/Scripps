/**
 *  MEMSTRUCTURE
 *  nnodes
 *  npaths
 *  Nodes {
 *      pos, RoomPosition
 *      nedges, number
 *      edges {
 *          end, number
 *          path, number
 *      }
 *  }
 *  paths {
 *      path, serializedPath
 *      start, number
 *      end, number
 *      len, number
 *  }
 * */

var pF = {
    addNode: function(room, x, y) {
        room.createFlag(x, y, Memory.spawns.Spawn1.pf.nnodes+"");
        Memory.spawns.Spawn1.pf.nodes[Memory.spawns.Spawn1.pf.nnodes++] = {
            pos: new RoomPosition(x, y, room),
            nedges: 0,
            edges: {}
        }
        return Memory.spawns.Spawn1.pf.nnodes-1;
    }
    addEdgeD: function(room, i, j) {
        var Upath = room.findPath(Memory.spawns.Spawn1.pf.nodes[i].pos, Memory.spawns.Spawn1.pf.nodes[j].pos, {ignoreCreeps: true, serialize: false});
        var Spath = Room.serializePath(Upath);
        Memory.spawns.Spawn1.pf.nodes[i].edges[Memory.spawns.Spawn1.pf.nodes[i].nedges++] = {
            end: j,
            path: Memory.spawns.Spawn1.pf.npaths
        }
        Memory.spawns.Spawn1.pf.paths[Memory.spawns.Spawn1.pf.npaths++] = {
            path: Spath,
            start: i,
            end: j,
            len: Upath.length
        }
        return Memory.spawns.Spawn1.pf.npaths-1;
    }
    addEdgeM: function(room, i, j, Upath) {
        var Spath = Room.serializePath(Upath);
        Memory.spawns.Spawn1.pf.nodes[i].edges[Memory.spawns.Spawn1.pf.nodes[i].nedges++] = {
            end: j,
            path: Memory.spawns.Spawn1.pf.npaths
        }
        Memory.spawns.Spawn1.pf.paths[Memory.spawns.Spawn1.pf.npaths++] = {
            path: Spath,
            start: i,
            end: j,
            len: Upath.length
        }
        return Memory.spawns.Spawn1.pf.npaths-1;
    }
    findPath(room, i, j) {
        var distances = {};
        distances[i] = 0;
        
    }
}







module.exports = pF;