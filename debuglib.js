var constLib = require('constlib');

module.exports.INFO = function(){
    console.log("# --- 100 TICK INFO LOG --- #");
    console.log("Namely we have creeps:");
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        console.log("  "+name+":  "+creep.hits+"/"+creep.hitsMax+" HP, "+creep.ticksToLive+" left");
    }
    console.log("----------");
    console.log("Summary: ");
    console.log("HV: "+Game.spawns.Spawn1.memory.harvesters+" / "+constLib.HARVESTER_MAX);
    console.log("UP: "+Game.spawns.Spawn1.memory.upgraders+" / "+constLib.UPGRADER_MAX);
    console.log("BD: "+Game.spawns.Spawn1.memory.builders+" / "+constLib.BUILDER_MAX);
    console.log("RP: "+Game.spawns.Spawn1.memory.repairers+" / "+constLib.REPAIRER_MAX);
    console.log("SC: "+Game.spawns.Spawn1.memory.scouts+" / "+constLib.SCOUT_MAX);
    console.log("AH: "+Game.spawns.Spawn1.memory.atkhelpers+" / "+constLib.ATKHELPER_MAX);
    console.log("CL: "+Game.spawns.Spawn1.memory.claimers+" / "+constLib.CLAIMER_MAX);
    console.log("DF: "+Game.spawns.Spawn1.memory.defenders+" / "+constLib.DEFENDER_MAX);
    console.log("==========");
    var sum = Game.spawns.Spawn1.memory.harvesters+Game.spawns.Spawn1.memory.upgraders+Game.spawns.Spawn1.memory.builders+Game.spawns.Spawn1.memory.repairers+Game.spawns.Spawn1.memory.scouts+Game.spawns.Spawn1.memory.atkhelpers+Memory.spawns.Spawn1.claimers+Memory.spawns.Spawn1.defenders;
    var sMax = constLib.HARVESTER_MAX+constLib.UPGRADER_MAX+constLib.BUILDER_MAX+constLib.REPAIRER_MAX+constLib.SCOUT_MAX+constLib.ATKHELPER_MAX+constLib.CLAIMER_MAX+constLib.DEFENDER_MAX;
    console.log("SUM: "+sum+" / "+sMax);
    console.log("LID: "+Game.spawns.Spawn1.memory.creepID+" and counting!");
    console.log("# --- END OF 100 TICK INFO LOG --- #");
}
