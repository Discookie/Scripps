/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('methodlib');
 * mod.thing == 'a thing'; // true
 */

module.exports.getSources = function() {
    var pre = Memory.spawns["Spawn1"].sources;
    var i = 0;
    var ret = {};
    for (var source in pre) {
        if (Game.getObjectById(Memory.spawns["Spawn1"].sources[source]).energy > 0) {
            ret[i++] = Game.getObjectById(Memory.spawns["Spawn1"].sources[source]);
        }
    }
    return ret;
};
