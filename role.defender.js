var _ = require('lodash');
var ml = require('methodlib');
var roleUpgrader = require('role.upgrader');
var roleAtkHelper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var cT = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (cT) {
            if (creep.attack(cT) == ERR_NOT_IN_RANGE) creep.moveTo(cT);
        } else creep.moveTo(32, 23);
        return;
	}
};

module.exports = roleAtkHelper;
