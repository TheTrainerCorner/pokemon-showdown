'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Swarm', () => {
	beforeEach(() => {
		battle = common.createBattle();
	});
	afterEach(() => {
		battle.destroy();
	});

	it("should prevent self boosting on switch in", () => {
		battle.setPlayer('p1', {team: [
			{species: "Orbeetle", ability: "swarm", moves: ["sleeptalk"]},
		]});
		battle.setPlayer('p2', {team: [
			{species: "Cinccino", moves: ["calmmind", "workup", "tailslap", "tidyup"]},
		]});

		battle.makeChoices("move sleeptalk", "move tidyup");
		assert.statStage(battle.p2.active[0], 'atk', 0);
		assert.statStage(battle.p2.active[0], 'spe', 0);
	});
});