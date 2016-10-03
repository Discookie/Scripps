var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }
	    

	    if(creep.memory.upgrading) {
	        creep.memory.returned = false;
	        if (creep.room.name == "W17S35") {
	            creep.moveTo(0, 32);
	            return;
	        }
	        var err = creep.upgradeController(/*Memory.spawns["Spawn1"].controllers[creep.memory.id % Memory.spawns["Spawn1"].length]*/creep.room.controller);
            if(err == ERR_NOT_IN_RANGE) {
                creep.moveTo(/*Memory.spawns["Spawn1"].controllers[creep.memory.id % Memory.spawns["Spawn1"].length]*/creep.room.controller);
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
                creep.memory.returned = true;
            }
            var ret = creep.harvest(sources[creep.memory.id % sources.length]);
            if(ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.id % sources.length]);
            }
	        } else creep.moveTo(49, 32);
        }
	}
};

module.exports = roleUpgrader;