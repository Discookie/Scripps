var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var ml = require('methodlib');

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name!="W17S35") {
            creep.moveTo(49, 32);
        }
        else if (creep.reserveController(creep.room.controller)==ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
    }
	};

module.exports = roleClaimer;