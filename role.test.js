var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');

var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (Game.time % 30 == 0) creep.say("Hi there!");
        if (Game.time % 30 == 1) creep.say("We can");
        if (Game.time % 30 == 2) creep.say("negotiate");
        if (Game.time % 30 == 3) creep.say("this later");
        if (Game.time % 30 == 4) creep.say("okay? :)");
        if (Game.time % 30 == 5) creep.say("Alliance?");
        //creep.moveTo(49, 32);
        //creep.say(creep.claimController(Game.getObjectById("576a9c0357110ab231d88561"))+"");
        //creep.suicide();
	}
};

module.exports = roleScout;
