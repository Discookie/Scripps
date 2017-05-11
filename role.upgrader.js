var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.moveTo(Game.flags.Flag1);
            return;
        }


        if (creep.memory.upgrading) {
            var err = creep.upgradeController( /*Memory.spawns["Spawn1"].controllers[creep.memory.id % Memory.spawns["Spawn1"].length]*/ creep.room.controller);
            if (err == ERR_NOT_IN_RANGE) {
                creep.moveTo( /*Memory.spawns["Spawn1"].controllers[creep.memory.id % Memory.spawns["Spawn1"].length]*/ creep.room.controller);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return (source.energy > 0)
                }
            });
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if (ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
        }
    }
};

module.exports = roleUpgrader;
