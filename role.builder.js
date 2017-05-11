var _ = require('lodash');
var ml = require('methodlib');
var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            creep.memory.returned = false;
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES
                /**, {
                	            filter: (structure) =>  structure.structureType == STRUCTURE_CONTAINER
                	        }*/
            );
            if (targets.length > 0) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && (structure.energy < structure.energyCapacity)
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    //console.log('nope');
                    //if (creep.memory.id % 2 == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    } else {
                        roleUpgrader.run(creep);
                    }
                    /**} else {
                        roleUpgrader.run(creep);
                    }*/
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => (source.energy > 0)
            });
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if (ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
        }
    }
}
};

module.exports = roleBuilder;
