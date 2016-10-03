var _ = require('lodash');
var ml = require('methodlib');
var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        creep.memory.returned = false;
	        if (creep.room.name == "W17S35") {
	            creep.moveTo(0, 32);
	            return;
	        }
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES/**, {
	            filter: (structure) =>  structure.structureType == STRUCTURE_CONTAINER
	        }*/);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) =>  (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)&& (structure.energy < structure.energyCapacity)
	        });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                //console.log('nope');
                if (creep.memory.id % 2 == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                    roleUpgrader.run(creep);
            }
                } else {
                    roleUpgrader.run(creep);
                }
            }
            }
                }
	    else {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => (source.energy > 0)
            });
	        if (((creep.memory.id % 7 < 2 || creep.room.name == "W17S35" )/**&&!(sources.length == 0 && creep.room.name == "W18S35") */)|| creep.memory.returned) {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => (source.energy > 0)
            });
            if (creep.room.name== "W17S35" && sources.length == 0) {
	            creep.moveTo(0, 32);
                creep.memory.returned = true;
                return;
            }
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if(ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
	        } else creep.moveTo(49, 31-(creep.memory.id % 2));
	    }
	}
};  

module.exports = roleBuilder;