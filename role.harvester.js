var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var ml = require('methodlib');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if (creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => (source.energy > 0)
            });
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if (ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity)
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType == STRUCTURE_TOWER) && (structure.energy < structure.energyCapacity)
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
                        if ((creep.memory.id >> 1) % 2) {
                            roleUpgrader.run(creep);
                            //console.log('nope');
                        } else {
                            roleBuilder.run(creep);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;
