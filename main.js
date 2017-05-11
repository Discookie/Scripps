var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleAtkHelper = require('role.atkhelper');
var roleScout = require('role.scout');
var roleClaimer = require('role.claimer');
var roleDefender = require('role.defender');
var roleTest = require('role.test');
var debugLib = require('debuglib');
var constLib = require('constlib');

module.exports.loop = function () {
    if (Game.time % 100 == 0) debugLib.INFO();

    var tower = Game.getObjectById('57a474fb1cd9fa5a2199868d');
    if (tower) {
        var cT = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (cT) tower.attack(cT);
        var cDS = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
        });
        if (cDS) tower.repair(cDS);
    }


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == constLib.ROLE_HARVESTER) {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == constLib.ROLE_UPGRADER) {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == constLib.ROLE_BUILDER) {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == constLib.ROLE_REPAIRER) {
            roleRepairer.run(creep);
        }
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            if (Memory.creeps[name].role == constLib.ROLE_HARVESTER) {
                Game.spawns.Spawn1.memory.harvesters--;
            }
            if (Memory.creeps[name].role == constLib.ROLE_UPGRADER) {
                Game.spawns.Spawn1.memory.upgraders--;
            }
            if (Memory.creeps[name].role == constLib.ROLE_BUILDER) {
                Game.spawns.Spawn1.memory.builders--;
            }
            if (Memory.creeps[name].role == constLib.ROLE_REPAIRER) {
                Game.spawns.Spawn1.memory.repairers--;
            }
            delete Memory.creeps[name];
        }
    }
    if (Game.spawns.Spawn1.memory.harvesters < 1) {
        Game.spawns.Spawn1.memory.creepID = 0;
        if (Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "HV", {
                role: constLib.ROLE_HARVESTER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "HV")
            Game.spawns.Spawn1.memory.harvesters++;
        else Game.spawns.Spawn1.memory.creepID--;
    } else if (Game.spawns.Spawn1.memory.upgraders < 1) {
        if (Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "UP", {
                role: constLib.ROLE_UPGRADER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "UP")
            Game.spawns.Spawn1.memory.upgraders++;
        else Game.spawns.Spawn1.memory.creepID--;
    } else if (Game.spawns.Spawn1.memory.harvesters < constLib.HARVESTER_MAX) {
        if (Game.spawns.Spawn1.createCreep( /**[WORK, WORK, WORK,WORK, WORK, CARRY, MOVE,CARRY, CARRY, MOVE, MOVE, MOVE]*/ [WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "HV", {
                role: constLib.ROLE_HARVESTER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "HV")
            Game.spawns.Spawn1.memory.harvesters++;
        else Game.spawns.Spawn1.memory.creepID--;
    } else if (Game.spawns.Spawn1.memory.upgraders < constLib.UPGRADER_MAX) {
        if (Game.spawns.Spawn1.createCreep( /**[WORK, WORK, WORK,WORK, WORK, CARRY, MOVE,CARRY, CARRY, MOVE, MOVE, MOVE]*/ [WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "UP", {
                role: constLib.ROLE_UPGRADER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "UP")
            Game.spawns.Spawn1.memory.upgraders++;
        else Game.spawns.Spawn1.memory.creepID--;
    } else if (Game.spawns.Spawn1.memory.builders < constLib.BUILDER_MAX) {
        if (Game.spawns.Spawn1.createCreep( /**[WORK, WORK, WORK,WORK, WORK, CARRY, MOVE,CARRY, CARRY, MOVE, MOVE, MOVE]*/ [WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "BD", {
                role: constLib.ROLE_BUILDER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "BD")
        //if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY,CARRY, MOVE, MOVE, MOVE], "BD"+Game.spawns.Spawn1.memory.creepID, {role: 2, id: Game.spawns.Spawn1.memory.creepID++}) == "BD"+(Game.spawns.Spawn1.memory.creepID-1))
            Game.spawns.Spawn1.memory.builders++;
        else Game.spawns.Spawn1.memory.creepID--;
    } else if (Game.spawns.Spawn1.memory.repairers < constLib.REPAIRER_MAX) {
        if (Game.spawns.Spawn1.createCreep( /**[WORK, WORK, WORK,WORK, WORK, CARRY, MOVE,CARRY, CARRY, MOVE, MOVE, MOVE]*/ [WORK, CARRY, MOVE], Game.spawns.Spawn1.memory.creepID + "RP", {
                role: constLib.ROLE_REPAIRER,
                id: Game.spawns.Spawn1.memory.creepID++
            }) == (Game.spawns.Spawn1.memory.creepID - 1) + "RP")
            Game.spawns.Spawn1.memory.repairers++;
        else Game.spawns.Spawn1.memory.creepID--;
    }
}
