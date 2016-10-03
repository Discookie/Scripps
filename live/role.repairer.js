var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {
	        creep.memory.returned = false;
	        if (creep.room.name == "W17S35") {
	            creep.moveTo(0, 32);
	            return;
	        }
                targets = creep.room.find(FIND_STRUCTURES/**, {
                    filter: (structure) => (structure.hits < structure.hitsMax) && (structure.structureType != STRUCTURE_ROAD)
                }*/);
                if (targets.length > 0) {
                    var sz = creep.repair(targets[Game.spawns.Spawn1.memory.repc % targets.length]);
                    if (sz==ERR_NOT_IN_RANGE) creep.moveTo(targets[Game.spawns.Spawn1.memory.repc % targets.length]);
                    if (sz == 0) Game.spawns.Spawn1.memory.repc++;
            } else {
                if (creep.memory.id % 2) {
                    roleBuilder.run(creep);
                } else {
                    roleHarvester.run(creep);
                }
	        }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => {return (source.energy > 0)}
            });
	        if (((creep.memory.id % 7 < 2 || creep.room.name == "W17S35" )&&!(sources.length == 0 && creep.room.name == "W18S35") )|| creep.memory.returned) {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => {return (source.energy > 0)}
            });
            if (creep.room.name== "W17S35" && sources.length == 0) {
	            creep.moveTo(0, 32);
                creep.memory.returned == true;
            }
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if(ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
	        } else creep.moveTo(49, 32);
        }
	}
};

module.exports = roleRepairer;