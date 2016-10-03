var deque = require('deque');

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
			delete Memory.creeps[name];
		}
	}
}