'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Pickup', () => {
	beforeEach(() => {
		battle = common.createBattle();
	});

	afterEach(() => {
		battle.destroy();
	});

	it("should remove hazards on side 1 and give it to side 2", () => {
		battle.setPlayer('p1', {team: [
			{species: "Cinccino", moves: ['sleeptalk', "tailslap"]},
			{species: "Lopunny", ability: "pickup", moves: ["sleeptalk"]},
		]});
		battle.setPlayer('p2', {team: [
			{species: "Regirock", ability: "granitestorm", moves: ["sleeptalk"]},
			{species: "Glaceon", moves: ["sleeptalk"]},
		]});

		battle.makeChoices('move tailslap', 'move sleeptalk');
		assert(battle.p1.sideConditions.stealthrock);
		battle.makeChoices('switch 2', 'move sleeptalk');
		assert.false(battle.p1.sideConditions.stealthrock);
		assert(battle.p2.sideConditions.stealthrock);
	});
});