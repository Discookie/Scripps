var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');

var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (Game.time % 30 == 0) creep.say("Hi there!");
        if (Game.time % 30 == 1) creep.say("I want to");
        if (Game.time % 30 == 2) creep.say("help");
        if (Game.time % 30 == 3) creep.say("revive you");
        if (Game.time % 30 == 4) creep.say("Ofc I");
        if (Game.time % 30 == 5) creep.say("won't");
        if (Game.time % 30 == 6) creep.say("destroy");
        if (Game.time % 30 == 7) creep.say("you!");
        if (Game.time % 30 == 8) creep.say("Alliance?");
        //creep.moveTo(49, 32);
        //if (creep.room.name != "W19S35") creep.moveTo(0, 23); else creep.moveTo(48, 23);
	}
};

module.exports = roleScout;