var _ = require('lodash');
var ml = require('methodlib');
var roleUpgrader = require('role.upgrader');
var roleAtkHelper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (Game.time % 30 == 15) creep.say("Send me a");
        if (Game.time % 30 == 16) creep.say("message if");
        if (Game.time % 30 == 17) creep.say("you let me");
        if (Game.time % 30 == 18) creep.say("through!");
        if (Game.time % 30 == 19) creep.say("Thanks!");
        if (Game.time % 30 == 20) creep.say(":)");
        //var cT = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS); 
       // if (cT) if (creep.attack(cT) == ERR_NOT_IN_RANGE) creep.moveTo(cT);
        //return;
        if (creep.room.name!="W19S35") {
            creep.moveTo(0, 16);
            return;
        }
        creep.moveTo(45, 20);
	}
};  

module.exports = roleAtkHelper;